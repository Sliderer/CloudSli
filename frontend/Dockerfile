FROM node:alpine 

WORKDIR /cloudsli-frontend

COPY ./package*.json ./

RUN npm install

COPY ./ .

CMD HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key npm start 