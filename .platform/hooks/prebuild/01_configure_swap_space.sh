#!/bin/bash

# 리눅스 스크립트
SWAPFILE=/var/swapfile

#SWAPFILE이 존재한다면, 배포
if [ -f $SWAPFILE ]; then
echo "$SWAPFILE found, skip"
exit;
fi

# 1M를 1024 = 1G
/bin/dd if=/dev/zero of=$SWAPFILE bs=1M count=1024
/bin/chmod 600 $SWAPFILE
/sbin/mkswap $SWAPFILE
/sbin/swapon $SWAPFILE