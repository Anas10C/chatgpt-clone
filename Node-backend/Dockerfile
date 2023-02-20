FROM node:18
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./models ./models
COPY ./controllers ./controllers
COPY ./routes ./routes
COPY ./services ./services
RUN npm install 
EXPOSE 9000
CMD ["node", "server.js"]