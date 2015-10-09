#!/bin/bash

arpCommand=$(command -v arp) 

result=$($arpCommand | awk 'BEGIN {print "["} NR>1 \
						{print "{ \"IP地址\": \"" $1 "\", " \
									"\"硬件类型\": \"" $2 "\", " \
									"\"硬件地址\": \"" $3 "\", " \
									"\"缓存条目\": \"" $4 "\", " \
									"\"静态条目\": \"" $5 "\" }, " \
									} \
					END {print "]"}' \
			| /bin/sed 'N;$s/},/}/;P;D')

if [ -z "$result" ];  then echo {}
else echo $result
fi 
