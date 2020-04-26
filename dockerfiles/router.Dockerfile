FROM nginx

COPY ./env/.default.conf /etc/nginx/conf.d/default.conf