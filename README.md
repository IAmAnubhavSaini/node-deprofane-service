# @f0c1s/node-deprofane-service

A service written in nodejs that removes profanity from text.

`npm run build && npm run start` for running locally.

```
http://localhost:50124/deprofane?rawtext=eat+coffee
{"hash":"71a0f52713c966b0261954878ac97d5d04c815511dcec7ffb05472db79bff2fa","output":"\"eat coffee\"","input":"eat coffee","ts":1669011450004}

http://localhost:50124/deprofane?rawtext=eat+shit
{"hash":"127ef56e200515253d82a7a6b141423e4ad1359e0232882627368a2f4e7f7580","output":"\"eat ****t\"","input":"eat shit","ts":1669011424906}
```

## docker

```shell
#docker build . -t f0c1s/deprofane-service
#docker push f0c1s/deprofane-service
docker run --rm --name "deprofane-service" -p 14000:14000 -d f0c1s/deprofane-service
#docker logs -f deprofane-service
#docker stop deprofane-service
```

## LICENSE

MIT
