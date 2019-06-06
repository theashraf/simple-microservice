FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build


CMD [ "npm", "start" ]