#!/bin/bash
/bin/cat /proc/net/dev \
| awk 'BEGIN {print "["} NR>2 {print "{ \"网卡\": \"" $1 "\"," \
					" \"已发送\": " $2 "," \
					" \"已接收\": " $10 " }," } END {print "]"}' \
| /bin/sed 'N;$s/,\n/\n/;P;D'
