## 使用
1. 部署
    ```shell script
   mkdir -p /opt/yapi/yapi/{mongo,yapi}
   docker-compose up
    ```
1. 访问ip:9090 ,输入相应配置
1. `Ctrl + C` 退出，修改docker-compose.yaml
    ```shell script
   #command: "yapi server"              #第一次启动使用
   command: "node /yapi/vendors/server/app.js"             #后面启动使用
    ```
1. 启动
    ```shell script
   docker-compose up -d
    ```
1. 访问ip:3000
