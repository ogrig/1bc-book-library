# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Install dependencies (prefer pnpm if lockfile exists)
RUN if [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm install; \
    else \
      npm ci; \
    fi

# Copy source and build
COPY . .

# Build-time API config (pass via --build-arg; e.g. --build-arg VITE_API_KEY=xxx --build-arg VITE_API_URL=https://api.example.com/Books)
ARG VITE_API_KEY
ARG VITE_API_URL
ENV VITE_API_KEY=${VITE_API_KEY}
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
