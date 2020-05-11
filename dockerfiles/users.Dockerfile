FROM node:alpine

WORKDIR /home/service

COPY ./package.json ./
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN rm -rf yarn.lock
RUN yarn global add mocha
RUN yarn install
COPY ./common/. ./common/.
COPY ./services/Users/. ./services/Users/.
COPY ./utils/. ./utils/.
COPY .env ./config.env

CMD ["yarn", "run", "start:users"]