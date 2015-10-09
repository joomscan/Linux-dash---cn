#!/bin/bash
numberOfCores=$(/bin/grep -c 'model name' /proc/cpuinfo)

if [ $numberOfCores -eq 0 ]; then
	numberOfCores=1
fi

result=$(/bin/cat /proc/loadavg | /usr/bin/awk '{print "{ \"1分钟平均负载\": " ($1*100)/'$numberOfCores' ", \"5分钟平均负载\": " ($2*100)/'$numberOfCores' ", \"15分钟平均负载\": " ($3*100)/'$numberOfCores' "}," }')

echo ${result%?}
