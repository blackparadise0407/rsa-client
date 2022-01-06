FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
# Stage 2 - the production environment
RUN yarn global add serve
CMD ["serve", "-s", "build", "-l", "3000"]