FROM node:18-alpine

WORKDIR /app

# Install dependencies first for caching purposes
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
