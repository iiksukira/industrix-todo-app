FROM node:24.8-alpine

WORKDIR /app

COPY package* ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["node", "src/server.js"]
