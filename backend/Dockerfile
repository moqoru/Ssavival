FROM openjdk:11.0.15-jre

WORKDIR /server

COPY ./build/libs/59m59s-0.0.1-SNAPSHOT.jar server.jar

COPY ./build/resources/main/application.properties application.properties

ENTRYPOINT ["java", "-jar", "server.jar", "-Dspring.config.location=./application.properties"]