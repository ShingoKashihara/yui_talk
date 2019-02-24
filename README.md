# yui_talk
結チームのチャット開発用リポジトリ

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



## ソースのクローン

- httpsの場合

`$ git clone https://github.com/ShingoKashihara/yui_talk.git`

- sshの場合(公開鍵の設定が別途必要)

`$ git clone git@github.com:ShingoKashihara/yui_talk.git`

## ディレクトリに移動

`$ cd yui_talk`

## 依存パッケージインストール

`$ npm install`

## 起動

`$ npm start`

## 確認

ブラウザで

http://{ipアドレスもしくはドメイン}:3000/login

にアクセス。

例）

http://localhost:3000/login

http://192.168.33.10:3000/login ←　vagrantの場合
