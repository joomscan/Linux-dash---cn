#!/bin/bash
result=$(/usr/bin/awk -F: '{ \
				if ($3<=499){userType="system";} \
				else {userType="user";} \
				print "{ \"类型\": \"" userType "\"" ", \"用户名\": \"" $1 "\", \"家目录\": \"" $6 "\" }," }' < /etc/passwd
		)

length=$(echo ${#result}) 

if [ $length -eq 0 ]; then
	result=$(getent passwd | /usr/bin/awk -F: '{ if ($3<=499){userType="system";} else {userType="user";} print "{ \"type\": \"" userType "\"" ", \"user\": \"" $1 "\", \"home\": \"" $6 "\" }," }')
fi

echo [ ${result%?} ]
