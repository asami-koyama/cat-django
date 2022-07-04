
# django react 環境構築


## 構築方法
- 環境取得
```
git clone https://github.com/asami-koyama/cat-django
cd cat-django
```

- django_react/setting.py 書き換え
```txt
ALLOWED_HOSTS = ['<<サーバIPアドレス>>']
```

- 起動
```
docker-compose up -d
docker-compose ps
```

- アクセス確認
```
http://＜＜サーバIPアドレス＞＞:3000
```
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
