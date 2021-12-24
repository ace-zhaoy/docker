## 常见失败原因
1. 因为挂载目录没有权限  
给定权限就好
2. bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]  
 ```
vim /etc/sysctl.conf
写入vm.max_map_count=655360，并保存退出
运行 sysctl -p
```
