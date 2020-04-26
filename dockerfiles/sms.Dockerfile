FROM node:alpine

WORKDIR /home/service

COPY ./package.json ./
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN rm -rf yarn.lock
RUN yarn install
COPY ./common/. ./common/.
COPY ./services/SMS/. ./services/SMS/.
COPY ./utils/. ./utils/.
COPY ./config/.config.sms.env ./config.env

CMD ["npm", "run", "start:sms"]