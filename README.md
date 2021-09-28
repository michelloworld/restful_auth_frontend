### RESTful Authentication Frontend

This just the basic example of how to implement API Authentication with "access token" and "refresh token" by using Next.js and Redux and it's work on both server side and client side.

This project will store refresh token in HttpOnly Cookie and access token will store in memory which is redux.

### How to run with docker compose

1. update to /etc/hosts on your machine (not in the docker container)

```
127.0.0.1       api.localhost.dev
```

2. update .env file

```
NODE_ENV=development
NODE_PORT=3000

REFRESH_TOKEN_LIFE=86400

NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://api.localhost.dev:4000/api/v1
```

3. run docker compose

```
docker-compose -f docker-compose.dev.yml up --build
```

4. access

```
U: admin@admin.com

P: password

http://localhost:3000
```

### Where is the backend?

[https://github.com/michelloworld/restful_auth_backend](https://github.com/michelloworld/restful_auth_backend)