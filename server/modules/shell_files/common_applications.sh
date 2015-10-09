#!/bin/bash
result=$(whereis php node mysql mongo vim python ruby java apache2 nginx openssl vsftpd make \
| awk -F: '{if(length($2)==0) { installed="false"; } else { installed="true"; } \
			print \
			"{ \
				\"应用名\": \""$1"\", \
				\"路径\": \""$2"\", \
				\"状态\": "installed" \
			},"}')

echo "[" ${result%?} "]"
