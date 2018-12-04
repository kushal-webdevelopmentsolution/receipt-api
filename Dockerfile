FROM node:8

COPY package*.json ./

RUN npm install

ENV host='XXXXXXXXXXXXXX'
ENV user='XXXXXXXXXXXXXX'
ENV database='XXXXXXXXXXXXXX'
ENV password='XXXXXXXXXXXXXX'
ENV port=5432
ENV currentSchema='XXXXXXXXXXXXXX'

COPY . .

EXPOSE 5434

CMD ["npm","start"]