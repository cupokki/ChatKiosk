# base image
FROM node

# set working directory
WORKDIR /app

# copy project files
COPY . .

# install dependencies
RUN npm install

# start app
CMD ["npm", "start"]
