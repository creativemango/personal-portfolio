# Use Maven image to build the project
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# Skip tests to speed up build
RUN mvn clean package -DskipTests

# Use JRE image for runtime
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy the built jar from the startup module
COPY --from=build /app/startup/target/*.jar app.jar

# Expose port (default 8080)
EXPOSE 8080

# Set active profile to prod
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
