# django react 環境構築

## 構築方法

-   環境取得

```
git clone https://github.com/asami-koyama/cat-django
cd cat-django
```

-   django_react/setting.py 書き換え

```txt
ALLOWED_HOSTS = ['<<サーバIPアドレス>>']
```

-   起動
    ※ 既存の image がある場合、全て消すこと

```
docker-compose up -d
docker-compose ps
```

-   アクセス確認

```
http://＜＜サーバIPアドレス＞＞:3000
```

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

-   db の構築

1. api/migration 下にある。既存の migration ファイル、migration ログを削除

2. main データベースを新規に作成

```
docker exec -it cat-django_db_1 bash
mysql -u root -ppassword
create database main;
```

3.

```
docker exec -it cat-django_backend_1 bash
python manage.py makemigrations
python manage.py migrate
```
