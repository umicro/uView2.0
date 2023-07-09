FROM node:16.16.0 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=builder /app/dist/build/h5 /usr/share/nginx/html
# 将根目录下的default.conf文件复制到nginx配置文件夹下
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
