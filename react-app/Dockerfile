FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run build

COPY . .

EXPOSE 3000
CMD [ "react-scripts", "start" ]