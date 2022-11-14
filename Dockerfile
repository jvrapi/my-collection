FROM node:lts

WORKDIR /usr/app

COPY package.json .

COPY . .

RUN yarn install

RUN npx prisma generate

EXPOSE 4000

CMD [ "yarn", "dev" ]