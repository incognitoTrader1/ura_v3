FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Build the application
FROM base as builder
RUN npm run build

# Production image
FROM base as production
ENV NODE_ENV=production

# Install production dependencies only
RUN npm ci --only=production

# Copy built files and other necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Ensure the Prisma schema is available
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Start the application
CMD ["npm", "start"]

# Development image
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]