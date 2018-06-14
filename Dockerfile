FROM keymetrics/pm2:latest-alpine

# Install Cairo and Pango for node-canvas
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build
RUN yarn global add pm2

ENV PORT 8080
ENV NODE_ENV production
EXPOSE 8080

CMD ["pm2-runtime", "pm2.config.js"]
