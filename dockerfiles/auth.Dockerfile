FROM node:alpine

WORKDIR /home/service

COPY ./package.json ./
RUN apk add --no-cache --update openssh-keygen
RUN apk add --no-cache --update openssl
# RUN rm -rf .ssh
# RUN mkdir .ssh
RUN ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
RUN openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN rm -rf yarn.lock
RUN mkdir -p /var/log/917ventures
RUN yarn global add mocha
RUN yarn install
COPY ./common/. ./common/.
COPY ./services/Auth/. ./services/Auth/.
COPY ./utils/. ./utils/.
COPY ./config/.config.auth.env ./config.env

CMD ["yarn", "run", "start:auth"]