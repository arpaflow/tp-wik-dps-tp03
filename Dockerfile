FROM node:latest AS build

WORKDIR /app

COPY --chown=app:node [^src]* /app
RUN npm install

COPY --chown=app:node ./src /app/src
RUN npx tsc

FROM node:slim AS exec

ARG PING_LISTEN_PORT
ENV PING_LISTEN_PORT=$PING_LISTEN_PORT

COPY --from=build /app/build/* /app/

WORKDIR /app
RUN useradd --system -r -s /usr/sbin/nologin app

USER app

CMD ["node", "index.js"]