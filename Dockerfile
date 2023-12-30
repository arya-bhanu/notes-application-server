FROM node:alpine3.18


ARG SERVER_PORT=5000
ARG CLIENT_URL=http://localhost:3000


ENV SERVER_PORT=5000
ENV CLIENT_URL=http://localhost:3000


ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=rahasia
ENV DB_NAME=postgres
ENV DB_HOST=postgres-db
ENV ACCESS_TOKEN_SECRET=secret

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build

CMD [ "npm" ,"run","start" ]