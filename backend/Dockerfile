FROM docker.m.daocloud.io/library/eclipse-temurin:21-jre
WORKDIR /app
ARG JAR_FILE=startup/target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java", "-jar", "app.jar"]
