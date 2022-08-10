FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ["src", "package.json", "yarn.lock", "./"]
RUN yarn install --production

EXPOSE 9000
CMD [ "node", "application/rest/index.js" ]
