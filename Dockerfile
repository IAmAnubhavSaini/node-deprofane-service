FROM node:16-alpine AS builder
ENV NODE_ENV production
ENV PORT 14000

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i -g typescript && npm i --save-dev @types/node

RUN npm ci --only=production
#RUN yarn install --production

COPY . .

# Expose port
EXPOSE 14000
# start
CMD ["node", "./src/service.js"]
