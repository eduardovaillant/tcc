FROM node:14-alpine

WORKDIR /usr/app/tweet-consumer

COPY package.json .

RUN npm install --only=prod && npm install typescript -g

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]