FROM node:20

ARG MONGO_URI
ENV ATLAS_URI=$MONGO_URI
ARG PORT
ENV PORT=$PORT

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# everything done by default as root
COPY --chown=node:node package*.json ./

USER node

RUN npm install
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]