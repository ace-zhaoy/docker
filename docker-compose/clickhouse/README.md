## 步骤
1. 先运行  
```shell
sudo docker-compose up
```
2. 将配置文件拷贝出来
 ```
sudo docker cp clickhouse-clickhouse-1:/etc/clickhouse-server/config.xml /opt/app/clickhouse/config/
sudo docker cp clickhouse-clickhouse-1:/etc/clickhouse-server/users.xml /opt/app/clickhouse/config/
```
3.停止并重新up服务
```shell
sudo docker-compose up -d
```