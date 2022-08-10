FROM node:16-alpine

ENV NODE_ENV=production DATA_LEVELS_PATH="../levels.json"

WORKDIR /app
COPY ["acceptance-test/data/it-levels.json", "data/levels.json", "src", "package.json", "yarn.lock", "./"]
RUN yarn install --production

EXPOSE 9000
CMD [ "node", "application/rest/index.js" ]
