import { randomBytes } from "crypto";
import { customAlphabet } from 'nanoid';
import { readFileSync } from "fs";
import { schedule } from "node-cron";

const TIME2000 = 946684800000;
const TIME_LENGTH = 8;
const NODE_LENGTH = 4;
const NOISE_LENGTH = 4;

const CONFIG = (() => {
  try {
    const file = readFileSync('../config.json', 'utf-8');
    const json: {
      instanceUrl: string;
      token: string;
    } = JSON.parse(file);
    return json;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();

const rankingEmoji = ['👑', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
const ohayouRegexp = /\s*oha((po)?(nn)?yo+(sanoo__i|u)?|you(gozaimasu)?)\s*/;

let counter = randomBytes(2).readUInt16LE(0);
const nodeId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', NODE_LENGTH)();

const getTime = (time: number): string => ((time -= TIME2000, time) < 0 ? 0 : time).toString(36).padStart(TIME_LENGTH, '0').slice(-TIME_LENGTH);
const getNoise = (): string => counter.toString(36).padStart(NOISE_LENGTH, '0').slice(-NOISE_LENGTH);

const parseAidx = (id: string): { date: Date; } => ({ date: new Date(parseInt(id.slice(0, TIME_LENGTH), 36) + TIME2000) });
const genAidx = (t: number): string => isNaN(t) ? ((err: Error) => { throw err })(new Error('Failed to create AIDX: Invalid Date')) : (counter++, getTime(t) + nodeId + getNoise());

const post = async (text: string): Promise<boolean> => {
  return fetch(`${CONFIG.instanceUrl}/api/notes/create`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      i: CONFIG.token,
      text: text,
    }),
  })
    .then((r) => r.ok)
    .catch((e) => (console.log(e), false));
}

const fetchNotes = async () => {
  try {
    const fetchNotes: Mi_Note[] = [];
    const today = new Date();
    let dummySinceId = genAidx(today.setHours(6, 0, 55, 0));
    let dummyUntilId = genAidx(today.setHours(7, 0,  5, 0));

    while (true) {
      const result = await fetch(`${CONFIG.instanceUrl}/api/notes/local-timeline`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          i: CONFIG.token,
          local: true,
          reply: false,
          renote: false,
          poll: false,
          limit: 70,
          sinceId: dummySinceId,
          untilId: dummyUntilId,
        }),
      })
        .then((res) => res.ok ? res.json() : new Array<Mi_Note>())
        .then((r: Mi_Note[]) => (r.forEach((note) => fetchNotes.push(note)), r))
        .catch((e) => (console.log(e), new Array<Mi_Note>()));

      if (result.length == 0 || parseAidx(result.slice(-1)[0].id).date.getTime() <= today.setHours(6, 59, 55, 0)) break;
      else {
        await (async (ms: number) => new Promise(resolve => setTimeout(resolve, ms)))(200);
        dummyUntilId = result.slice(-1)[0].id;
      }
    };
    return fetchNotes;
  } catch (e) {
    console.log(e);
    return new Array<Mi_Note>();
  }
}

const createRanking = (notes: Mi_Note[]): [{ userName: string, time_ms: number }[], number] => {
  let countFlying = 0;
  const am7 = new Date().setHours(7, 0, 0, 0);
  const record = notes
    .map((n) => ({
      userName: n.user.username,
      time_ms: parseAidx(n.id).date.getTime() - am7,
    }))
    .sort((a, b) => a.time_ms < b.time_ms ? -1 : 1)
    .filter((n => {
      if (n.time_ms >= 0) return n;
      else countFlying++;
    }))
    .slice(0, 10);
  return [record, countFlying];
}

const ranker = async () => {
  const notes = (await fetchNotes())
    .filter((n) => !n.user.isBot && n.text && n.text.match(ohayouRegexp));
  const ranking = createRanking(notes);
  post(`朝チャレンジ Top10 ${new Date().toLocaleDateString('sv-SE')}\n\n${ranking[0].map((n, i) => {
    return `${rankingEmoji[i]} @${n.userName} +${n.time_ms} ms`
  }).join('\n')}\n\n記録したノート: ${notes.length}\nフライング: ${ranking[1]}`);
}

(() => {
  console.log('Start service.');
  schedule('5 0 7 * * *', () => {
    console.log('Run ranker');
    ranker();
  });
})();
