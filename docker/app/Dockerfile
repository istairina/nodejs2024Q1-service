FROM node:18.12-alpine3.17

WORKDIR /user/app/src

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]