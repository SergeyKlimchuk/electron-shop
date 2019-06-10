FROM node:12.2-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx:1.16.0-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/electron /usr/share/nginx/html
COPY ./certificates/usrt /etc/certificates
EXPOSE 443 80
CMD ["nginx", "-g", "daemon off;"]
