#!/bin/bash
result=$(/bin/cat /proc/swaps \
			| /usr/bin/awk 'NR>1 {print "{ \"位置\": \"" $1"\", \"类型\": \""$2"\", \"大小\": \""$3"\", \"用量\": \""$4"\", \"权重\": \""$5"\"}," }'
		)
echo [ ${result%?} ]
