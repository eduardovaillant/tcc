FROM node:14

WORKDIR /usr/app/tweet-collector

COPY package.json .

RUN npm install --only=prod && npm install typescript -g

COPY . .

RUN npm run build

CMD [ "node", "./dist/main.js" ]