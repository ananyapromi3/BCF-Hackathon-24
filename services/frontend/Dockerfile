# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./ 

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the working directory
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Use a minimal base image for serving the application
FROM node:18-alpine AS runner

# Step 8: Set the working directory in the new image
WORKDIR /app

# Step 9: Copy over the build artifacts from the builder stage
COPY --from=builder /app ./

# Step 10: Expose port 3000 to the outside world
EXPOSE 3000

# Step 11: Set the command to start the Next.js server in production mode
CMD ["npm", "run", "start"]
