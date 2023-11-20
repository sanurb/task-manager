# Build stage
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
# Primero copiamos solo el POM y descargamos las dependencias
COPY ./task-manager-api/pom.xml /app/
RUN mvn dependency:go-offline

# Luego copiamos el resto del código y construimos
COPY ./task-manager-api/src /app/src
RUN mvn package -DskipTests

# Run stage 
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
