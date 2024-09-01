FROM node:22-alpine

WORKDIR /code

COPY js/package.json package.json
COPY js/package-lock.json package-lock.json

RUN npm install

COPY js/ .

CMD [ "npm", "start" ]
