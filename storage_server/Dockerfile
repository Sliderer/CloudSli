FROM openjdk:21

WORKDIR ./storage-server
COPY ./target/backend-0.0.1-SNAPSHOT.jar .
RUN mkdir CloudStorage
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]