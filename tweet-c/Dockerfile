FROM node:14-alpine

WORKDIR /usr/app/tweet-collector

COPY package.json .

RUN npm install && npm install typescript -g

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]