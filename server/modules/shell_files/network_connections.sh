#!/bin/bash
netstatCmd=`which netstat`
awkCmd=`which awk`
sortCmd=`which sort`
uniqCmd=`which uniq`
sedCmd=`which sed`

$netstatCmd -ntu \
| $awkCmd 'NR>2 {print $5}' \
| $sortCmd \
| $uniqCmd -c \
| $awkCmd 'BEGIN {print "["} {print "{ \"连接数\": " $1 ", \"来源地址\": \"" $2 "\" }," } END {print "]"}' \
| $sedCmd 'N;$s/},/}/;P;D'
