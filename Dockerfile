FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm run migration:run:prod

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run:prod && npm run start:prod"]