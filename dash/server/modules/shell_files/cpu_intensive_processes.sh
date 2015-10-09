#!/bin/bash

result=$(/bin/ps axo pid,user,pcpu,rss,vsz,comm --sort -pcpu,-rss,-vsz \
			| head -n 15 \
			| /usr/bin/awk 'BEGIN{OFS=":"} NR>1 {print "{ \"pid\": " $1 \
							", \"用户\": \"" $2 "\"" \
							", \"量比\": " $3 \
							", \"物理\": " $4 \
							", \"虚拟\": " $5 \
							", \"服务\": \"" $6 "\"" "},"\
						}')

echo "[" ${result%?} "]"
