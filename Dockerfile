FROM maven:3.9.5-openjdk-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=build /target/cinepass-0.0.1-SNAPSHOT.jar cinepass.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","roma-tarot-master.jar"]