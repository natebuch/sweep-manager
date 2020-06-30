FROM node:10.15.1

WORKDIR /usr/src
COPY COPY . ./
RUN yarn

RUN yarn build
