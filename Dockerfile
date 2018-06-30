FROM keymetrics/pm2:latest-alpine

# Install Cairo and Pango for node-canvas
RUN apk add --update --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

RUN yarn global add pm2

RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

COPY . .
RUN yarn build

ENV PORT 3000
ENV NODE_ENV production
EXPOSE 3000

CMD ["pm2-runtime", "pm2.config.js"]
