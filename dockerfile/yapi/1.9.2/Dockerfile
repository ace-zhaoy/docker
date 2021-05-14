FROM node:12-alpine

COPY etc/repositories /etc/apk/repositories

RUN npm install -g yapi-cli --registry https://registry.npm.taobao.org

EXPOSE 3000 9090
