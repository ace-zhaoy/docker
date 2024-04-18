FROM golang:1.18.1
MAINTAINER zhaoyang

RUN apt-get update && \
    apt-get install tzdata && \
    git config --global url."git@github.com:connections-ai".insteadOf "https://github.com/connections-ai" && \
#    go env -w GOPROXY=https://goproxy.cn,direct && \
    go env -w GO111MODULE=on

ENV TZ=Asia/Shanghai