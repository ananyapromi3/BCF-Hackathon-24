# dockerlearn-ui/Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "serve"]
