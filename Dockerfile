# Build stage
FROM node:alpine AS build

# Set the current working directory inside the container
ARG WORKDIR=/usr/src/app
WORKDIR ${WORKDIR}

# Copy package
COPY package.json ./
COPY yarn.lock ./
COPY .env ./

RUN yarn global add @angular/cli
RUN yarn install --ignore-scripts

# Copy all files
COPY . .

# Build app
RUN yarn build


# Prod stage
FROM nginx:alpine

# Set the current working directory inside the container
ARG WORKDIR=/usr/src/app
WORKDIR ${WORKDIR}

# Copy nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy from development
COPY --from=build ${WORKDIR}/dist/first-project .

