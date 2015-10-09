#!/bin/bash
result=$(/bin/ps axo pid,user,pmem,rss,vsz,comm --sort -pmem,-rss,-vsz \
			| head -n 15 \
			| /usr/bin/awk 'NR>1 {print "{ \"pid\": " $1 \
										", \"用户\": \"" $2 \
										"\", \"用量\": " $3 \
										", \"物理\": " $4 \
										", \"虚拟\": " $5 \
										", \"服务\": \"" $6 \
										"\"},"}')

echo [ ${result%?} ]
