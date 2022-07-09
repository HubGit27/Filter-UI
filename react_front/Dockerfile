# FROM node:17 as build

# WORKDIR /code

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:1.12-alpine

# COPY --from=build /code/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

##docker run --rm -it --name web -p 3000:80 <imagename>

FROM node:17 

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]