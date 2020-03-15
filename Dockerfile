FROM node:10
WORKDIR /front-server
COPY ./package.json ./
RUN ["yarn"]
COPY .. .
RUN ["yarn", "build:front"]
CMD ["yarn", "start:front"]
