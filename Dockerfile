# base image
FROM node

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json .

# install dependencies
RUN npm install

# copy project files
COPY . .

# start app
CMD ["npm", "start"]
