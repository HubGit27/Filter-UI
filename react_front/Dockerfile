FROM node:17 as build
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

RUN npm run build

FROM nginx:1.23.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM node:17 

# WORKDIR /code

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]