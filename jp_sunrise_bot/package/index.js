const color = { red:'\u001b[31m',reset:'\u001b[0m',green:'\u001b[32m',blue:'\u001b[34m',bold:'\x1b[1m'};
const config = JSON.parse(require('fs').readFileSync("../config.json", 'utf8'));

console.log(`${color.bold}日本の夜明けBot (v0.1.0)${color.reset}\nDeveloper: Suki(${color.green}misskey.io${color.reset} https://misskey.io/@suki_music)\n\n[${color.blue}configs${color.reset}]\n instanceUrl: ${config.instanceUrl}\n token: ${config.token}\n`)

const postNote = () => fetch(`${config.instanceUrl}/api/notes/create`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    i: config.token,
    text: "日本の夜明けぜよおおおぉぉぉぉ！",
  }),
})
  .then(r => {
    if (r.ok) console.log(`[${color.green}log${color.reset}]: Successful submission!`);
    else console.log(`[${color.red}Error!${color.reset}]: Posting failed!`);
  });

require('node-cron').schedule('0 0 3 * * *', async () => {
  const sunrise = new Date(await fetch('https://api.sunrise-sunset.org/json?lat=35.410000&lng=139.69200&date=today&formatted=0')
    .then(r => r.json())
    .then(d => d.results.sunrise));
  console.log(`[${color.green}log${color.reset}]: fetch sunrise time -> ${color.green}${sunrise}${color.reset}`);
  await (async (ms) => new Promise(resolve => setTimeout(resolve, ms)))(sunrise.getTime() - new Date().getTime());
  postNote();
});
