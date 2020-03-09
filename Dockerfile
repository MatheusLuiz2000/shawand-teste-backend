FROM node:12.14.1-alpine3.9
RUN npm config set unsafe-perm true
RUN npm install pm2 -g
WORKDIR /usr/src/serasa
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "npm", "run", "deploy" ]