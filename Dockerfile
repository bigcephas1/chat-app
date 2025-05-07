# -------- Stage 1: Build Stage --------
FROM node:21-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# -------- Stage 2: Production Stage --------
FROM node:21-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app /app

# Remove devDependencies to slim down the production image
RUN npm prune --production

# Expose the port used by the Express app
EXPOSE 5000 

# Start the application
CMD ["node", "app.js"]

