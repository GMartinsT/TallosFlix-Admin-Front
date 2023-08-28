FROM node:16-alpine

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "serve"]