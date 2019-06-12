FROM node:10-alpine AS build
RUN apk add --update --no-cache \
    python \
    make \
    g++
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:10-alpine
WORKDIR /app
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/build build
EXPOSE 3000
USER node

CMD ["node", "./build/index.js"]