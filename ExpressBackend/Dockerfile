FROM node:17 as production

#ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm start

EXPOSE 5000

CMD ["npm", "start"]

#docker run --rm -it --name back -p 5000:5000 <imagename>
