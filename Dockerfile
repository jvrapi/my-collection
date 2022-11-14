FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

COPY . .

RUN yarn install

EXPOSE 4000

CMD [ "yarn", "dev" ]