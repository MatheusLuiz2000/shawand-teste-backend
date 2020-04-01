FROM node:12.14.1-alpine3.9
RUN npm config set unsafe-perm true
RUN npm install pm2 -g
RUN apk add --no-cache libc6-compat curl unzip ca-certificates
WORKDIR /usr/src/workspace
RUN curl https://s3.dualstack.us-east-1.amazonaws.com/aws-xray-assets.us-east-1/xray-daemon/aws-xray-daemon-linux-2.x.zip -o install.zip
RUN unzip ./install.zip
RUN mv xray /usr/bin/xray
WORKDIR /usr/src/receita
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD xray --local-mode --bind=0.0.0.0:2000 --region=us-east-1 & npm run deploy