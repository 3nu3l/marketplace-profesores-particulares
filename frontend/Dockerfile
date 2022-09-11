FROM node:alpine3.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install

# Build App
RUN npm run build

# Set grants SA and bundle app source
RUN chown -R node:node .

# Change SA
USER node

# Run app
CMD [ "npm", "start" ]