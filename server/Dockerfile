FROM node:20


ARG MONGO_PWD
ARG MONGO_USERNAME
ARG MONGO_CLIENT_PROTOCOL
ARG MONGO_SERVER_AND_PORT

ENV DB_PASSWORD=$MONGO_PWD
ENV DB_USER=$MONGO_USERNAME
ENV MONGO_PROTOCOL=$MONGO_CLIENT_PROTOCOL
ENV SERVER_AND_PORT=$MONGO_SERVER_AND_PORT

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# everything done by default as root
COPY --chown=node:node package*.json ./

USER node

RUN npm install
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]