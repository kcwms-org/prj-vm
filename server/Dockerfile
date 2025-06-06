FROM node:20


ARG MONGO_PWD
ARG MONGO_USERNAME
ARG MONGO_CLIENT_PROTOCOL
ARG MONGO_SERVER_AND_PORT
ARG PORT

ENV MONGO_PWD=$MONGO_PWD
ENV MONGO_USERNAME=$MONGO_USERNAME
ENV MONGO_CLIENT_PROTOCOL=$MONGO_CLIENT_PROTOCOL
ENV MONGO_SERVER_AND_PORT=$MONGO_SERVER_AND_PORT
ENV PORT=$PORT

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# everything done by default as root
COPY --chown=node:node package*.json ./

USER node

RUN npm install
COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "node", "server.js" ]