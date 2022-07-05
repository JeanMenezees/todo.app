FROM node:14.13.1-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest

RUN mkdir /opt/todo.app && chown node:node /opt/todo.app
WORKDIR /opt/todo.app
ENV PATH /opt/todo.app/.bin:$PATH
USER node
COPY ./package.json ./package-lock.json ./
RUN npm install

WORKDIR /opt/todo.app/app

ENTRYPOINT ["npm", "run"]
CMD ["web"]