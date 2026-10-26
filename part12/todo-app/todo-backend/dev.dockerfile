FROM node:24

WORKDIR /usr/src/server
COPY . .

RUN npm install

CMD ["npm", "run", "dev"]