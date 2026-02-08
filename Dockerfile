# ---------- build frontend ----------
FROM node:20-alpine AS fe-build
WORKDIR /frontend

# install deps
COPY frontend/lawncare-frontend/package*.json ./
RUN yarn install

# copy source + build
COPY frontend/lawncare-frontend/ ./
RUN yarn build


# ---------- build backend ----------
FROM gradle:8.7-jdk17 AS be-build
WORKDIR /app

# copy backend source
COPY backend/ ./backend/

# copy built frontend into Spring Boot static resources
COPY --from=fe-build /frontend/dist ./backend/src/main/resources/static

# build spring boot jar
WORKDIR /app/backend
RUN gradle clean bootJar --no-daemon


# ---------- runtime ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=be-build /app/backend/build/libs/*.jar app.jar

EXPOSE 10000
ENV PORT=10000

ENTRYPOINT ["java","-jar","app.jar"]
