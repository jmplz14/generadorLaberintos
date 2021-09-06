FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY views ./
COPY routes ./
COPY public ./ 
COPY bin ./
COPY app.js ./
RUN npm install
COPY . . 

CMD ["npm" , "start" ]
