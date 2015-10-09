#!/bin/bash
result=$(COLUMNS=300 /usr/bin/w -h | /usr/bin/awk '{print "{\"用户名\": \"" $1 "\", \"来源地址\": \"" $3 "\", \"登录时间\": \"" $4 "\"},"}')

echo [ ${result%?} ]
