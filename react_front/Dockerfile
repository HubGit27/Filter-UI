# FROM node:17 as build

# WORKDIR /code

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["sh", "-c", "npm run start:build"]

FROM node:17 

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]