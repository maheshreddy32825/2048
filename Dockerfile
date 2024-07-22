# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the static files
RUN npm install -g serve

# Expose port 5000 (default port used by serve)
EXPOSE 5000

# Serve the static files from the 'out' directory
CMD ["serve", "-s", "out"]