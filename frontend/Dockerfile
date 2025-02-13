FROM node:20.16-alpine3.20

RUN addgroup apps && adduser -S -G apps apps


WORKDIR /usr/src/apps

COPY package*.json .

RUN npm install

COPY . . 

RUN npm run build


RUN chown -R apps:apps /usr/src/apps
USER apps

EXPOSE 3000




