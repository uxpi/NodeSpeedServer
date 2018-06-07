FROM node:8
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

COPY . .


EXPOSE 8080
CMD node app.js