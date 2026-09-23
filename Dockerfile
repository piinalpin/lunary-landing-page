# Stage 1: Build the static assets
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package.json package-lock.json* ./

# Install dependencies using npm
RUN npm install

# Copy application source code
COPY . .

# Build-time arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ARG VITE_APP_NAME
ARG VITE_APP_LOGIN_URL
ARG VITE_LANDING_PAGE_SECRET

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_TIMEOUT=$VITE_API_TIMEOUT \
    VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_LOGIN_URL=$VITE_APP_LOGIN_URL \
    VITE_LANDING_PAGE_SECRET=$VITE_LANDING_PAGE_SECRET

# Build production assets
RUN npm run build

# Stage 2: Serve with Nginx Alpine
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
