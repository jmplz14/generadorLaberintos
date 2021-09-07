FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN mkdir /usr/src/app/code
CMD ["npm" , "start" ]
