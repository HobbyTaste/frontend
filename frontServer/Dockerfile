FROM node:10
WORKDIR /front-server
COPY ./package.json .
RUN ["yarn"]
COPY node_modules ./node_modeles
COPY frontServer ./frontServer
COPY webpack.config.js .
COPY static ./static
COPY config ./config
COPY .babelrc .
COPY tsconfig.json .
RUN ["yarn", "build:front"]
CMD ["yarn", "start:front"]
