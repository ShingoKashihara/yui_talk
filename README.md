# yui_talk
結チームのチャット開発用リポジトリ

#### 目次

- [事前準備](#%E4%BA%8B%E5%89%8D%E6%BA%96%E5%82%99)

- [アプリケーション導入〜起動](#%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%B0%8E%E5%85%A5%E8%B5%B7%E5%8B%95)

- [tips](#tips)

## 事前準備

### mongodb環境構築

#### インストール

- リポジトリ登録

下記ファイルを作成し、追記します。

`$ vi /etc/yum.repos.d/mongodb.repo`

```js
[mongodb]
  
name=MongoDB repo
  
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
  
gpgcheck=0
  
enabled=1
```

- インストール

`$ yum install mongodb-org`

#### 起動

- 自動起動on

`$ chkconfig  mongod  on`

- 起動

`$ service mongod start`

#### データ作成

- ログイン

`$ mongo`

- DB作成

`> use yui_talk`

- collection作成

`> db.createCollection("users");`

- データ作成

```json
db.users.insert(
  {
    id: "1",
    name: "kataoka",
    email: "kataoka@no1s.biz",
    password: "test"
  }
);
```

## アプリケーション導入〜起動

### ソースのクローン

- httpsの場合

`$ git clone https://github.com/ShingoKashihara/yui_talk.git`

- sshの場合(公開鍵の設定が別途必要)

`$ git clone git@github.com:ShingoKashihara/yui_talk.git`

### ディレクトリに移動

`$ cd yui_talk`

### 依存パッケージインストール

`$ npm install`

### 起動

`$ npm start`

失敗する場合は、node.js のバージョンを6.16.0にして実行してください。

※nコマンドでバージョン指定して実行する場合のコマンド（npm startで成功する場合は打たなくていいです）

`$ n use 6.16.0 --expose-gc ./bin/www`

### 確認

ブラウザで

http://{ipアドレスもしくはドメイン}:3000/login

にアクセス。

例）

http://localhost:3000/login

http://192.168.33.10:3000/login ←　vagrantの場合

## tips

### デフォルトメッセージ（バリデーションなどの英語表記など）の日本語化リスト追加方法

下記ファイルに英語表記、日本語表記を追記します。

`yui_talk/locals/ja.json`

例）

```json
{
	"Missing credentials": "認証に失敗しました。",
	"invalid username": "ユーザー名に誤りがあります。"
}
```

ejsでは、下記の形式でメッセージを受け取ります。

```ejs
<%- __(message) %>
```
