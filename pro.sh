#!/usr/bin/env node --max_old_space_size=4096 
git pull

npm i 
chattr -i ./dist/.user.ini
rm -f -r ./dist
npm run build



