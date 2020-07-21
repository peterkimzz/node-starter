FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --silent

COPY . .

RUN yarn build

EXPOSE 3000