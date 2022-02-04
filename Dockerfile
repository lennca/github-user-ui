FROM node:16.13.2 as build

WORKDIR /app

COPY package.json ./
RUN npm install --silent

COPY . ./
RUN npm run build

# nginx
FROM nginx:1.21.6
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
