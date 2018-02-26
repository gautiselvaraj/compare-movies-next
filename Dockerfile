FROM gcr.io/google_appengine/nodejs

# Install Cairo and Pango for node-canvas
RUN apt-get update && apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

RUN /usr/local/bin/install_node '>=6.9.0'

COPY . /app/
RUN yarn install
RUN yarn build
CMD yarn start
