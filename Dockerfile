# -----------------------------------------------
# Dockerfile for React Native + Expo Project
# -----------------------------------------------
# This file builds a container to run the Expo
# Metro Bundler for development purposes.
# -----------------------------------------------

# 1. Use a specific Node.js version
FROM node:18.20.8

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only package files for cached dependency install
COPY package.json yarn.lock* package-lock.json* ./

# 4. Install dependencies using Yarn or NPM
RUN yarn install || npm install

# 5. Copy all project files into the container
COPY . .

# 6. Set and expose a default Expo port (can be overridden at runtime)
ARG EXPO_PORT=19000
ENV EXPO_PORT=$EXPO_PORT
EXPOSE $EXPO_PORT

# 7. Use local Expo CLI via npx to start the bundler
CMD ["npx", "expo", "start", "--tunnel", "--port", "$EXPO_PORT"]
