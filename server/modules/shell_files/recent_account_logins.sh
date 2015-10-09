#!/bin/bash
result=$(/usr/bin/lastlog -t 365 \
			| /usr/bin/awk 'NR>1 {\
				print "{ \
					\"用户名\": \"" $1 "\", \
					\"来源地址\": \"" $3 "\","" \
					\"登录时间\": \"" $5" "$6" "$7" "$8" "$9 "\"},"
				}'
		)
echo [ ${result%?} ]
