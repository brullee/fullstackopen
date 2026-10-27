FROM node:24

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install -g nodemon

CMD ["nodemon", "--legacy-watch", "--ext", "ts", "--exec", "tsc --noEmit && node --experimental-transform-types src/index.ts"]
