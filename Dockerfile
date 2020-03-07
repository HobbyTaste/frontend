FROM node:10

WORKDIR /src/app
COPY . .

RUN ["yarn"]
RUN ["yarn", "build"]

CMD ["yarn", "start"]
