FROM node:14

WORKDIR /usr/app/tweet-consumer

COPY package.json .

RUN npm install && npm install typescript -g

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]