# Use an official Node.js 20.x image for x64 devices
FROM node:20.12.2

# Set the working directory inside the container to /app/backend
WORKDIR /app/backend

# Copy the chuyenkhoan.csv file into the container's /app directory
COPY chuyen_khoan.csv /app/

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY backend .

# Expose port 9090 (your API's port)
EXPOSE 9090

# Define the command to run the application
CMD ["node", "."]
