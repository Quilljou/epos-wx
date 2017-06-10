#!/bin/sh
deployUrl="116.62.68.144"
deployDir="epos-wx"


ssh-add ~/.ssh/github
scp -r dist/* root@$deployUrl:/usr/share/nginx/html/$deployDir
