# Step 1: Build the React application
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your React application
RUN npm run build

# Step 2: Set up the server environment
FROM node:14

# Set the working directory for the server
WORKDIR /usr/src/app

# Copy server dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copy the built React app and any other server files
COPY --from=builder /app/build ./build
COPY server.js .

# Your application will bind to port 3000, so expose it
EXPOSE 3000

# Start the server using the server.js file
CMD ["node", "server.js"]
