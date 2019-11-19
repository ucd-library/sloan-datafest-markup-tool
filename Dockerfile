FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY lib lib
COPY controllers controllers
COPY index.js .

COPY client/public/package.json client/public/package.json
COPY client/dist client/dist

CMD node index.js