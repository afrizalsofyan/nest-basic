FROM node:22.4.1

WORKDIR /var/www

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn install
# RUN yarn db:migrate
RUN yarn db:generate
RUN yarn build
# RUN yarn start
CMD [ "yarn", "start:prod" ]
# CMD ["node", "dist/server.js"]