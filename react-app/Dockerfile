FROM node
RUN yarn global add serve
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
CMD serve -s -p 5000 build
