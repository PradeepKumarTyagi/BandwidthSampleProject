FROM node:8

# Create app directory
WORKDIR /app

# RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD npm i && npm start