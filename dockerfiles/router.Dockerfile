FROM nginx

COPY ./services/Router/default.conf /etc/nginx/conf.d/default.conf