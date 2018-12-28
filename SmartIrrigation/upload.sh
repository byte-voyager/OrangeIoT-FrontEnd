#!/usr/bin/env bash
sh build-prod.sh
rm dist.tar
tar cf dist.tar dist
echo 'start upload...'
scp dist.tar root@iot.alonebo.top:/var/www/html
echo 'upload finished'
