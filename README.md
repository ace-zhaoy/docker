# 构建自己的镜像和容器

## 使用
1. 进入docker-compose/registry，启动registry作为镜像仓库
    ```shell script
     docker-compose up -d
    ```
1. 进入dockerfile中的项目目录，如dockerfile/php/7.0.33
1. 构建镜像、打上tag并推送远程仓库（换成自己的ip）
    ```shell script
     docker build -t php:7.0.33 .
     docker tag php:7.0.33 192.168.159.130:5000/php:7.0.33
     docker push 192.168.159.130:5000/php:7.0.33
    ```
1. 查看仓库中镜像
    ```shell script
     curl http://192.168.159.130:5000/v2/_catalog
     curl http://192.168.159.130:5000/v2/php/tags/list
    ```
1. 修改项目的docker-compose.yml中image的ip，如:docker-compose/web/docker-compose.yml
1. 启动项目即可
