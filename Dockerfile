FROM node

WORKDIR /

COPY package.json .

RUN npm install

EXPOSE 3000

RUN npm i -g serve

COPY . .

RUN npm run build

CMD [ "serve", "-s", "dist" ]