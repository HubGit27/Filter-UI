FROM node:17 as production

#ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG HOST_IP_ADDRESS
ENV HOST_IP_ADDRESS $HOST_IP_ADDRESS

EXPOSE 5000

CMD ["npm", "start"]

#docker run --rm -it --name back -p 5000:5000 <imagename>
