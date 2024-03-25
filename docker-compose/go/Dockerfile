FROM golang:1.18.1
MAINTAINER zhaoyang

ENV TZ=Asia/Shanghai

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    cp /etc/apt/sources.list /etc/apt/sources.list.bak && \
    sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    apt-get clean && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 871920D1991BC93C && \
    apt-get update && \
    apt-get install tzdata && \
    git config --global url."git@github.com:connections-ai".insteadOf "https://github.com/connections-ai" && \
    go env -w GOPROXY=https://goproxy.cn,direct && \
    go env -w GO111MODULE=on

