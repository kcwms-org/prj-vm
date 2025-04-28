# Stage 1: Build the Vue.js app
FROM node:23-slim AS build-stage

# Receive arguments from ../../docker-compose.yml
ARG API_SERVER_URL
# Set environment variables
ENV VITE_SERVER_URL=${API_SERVER_URL}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js app
RUN npm run build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]