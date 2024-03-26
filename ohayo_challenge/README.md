# ohayo_challenge

## 何これは... ?
AM7:00に`/\s*oha((po)?(nn)?yo+(sanoo__i|u)?|you(gozaimasu)?)\s*/`にマッチする投稿を記録しランキングを作成するBotです。

## 使い方
config.jsonを作成してrootディレクトリに配置してください。(/ohayo_challenge)
ohayo_challenge.serviceは必要な所を追記して/etc/systemd/system/に配置してください。

config.json
```json
{
  "instanceUrl": "#末尾の/は要りません。",
  "token": "#tokenを生成してください、投稿のみ許可していれば大丈夫です。"
}
```

## License
MIT License

Copyright © 2023 好き

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.