FROM maven:3-jdk-8-alpine AS build
COPY . /app
WORKDIR /app
# Start build application
RUN mvn install -Dmaven.test.skip=true compile package

# Create image with compiled service
FROM openjdk:8-alpine
WORKDIR /app
# Copy succes builded service
COPY --from=build /app/target/electron-shop.jar /app/app.jar

# Configurations
ENV DATABASE_ADDRESS=database
ENV DATABASE_DB=electron
ENV DATABASE_USERNAME=admin
ENV DATABASE_PASSWORD=123321
ENV PATH_TO_FILES=/files
# Start service
# ENTRYPOINT [ "ping", "localhost", "-c", "999999999" ]

ENTRYPOINT java -jar app.jar --spring.datasource.url=jdbc:postgresql://$DATABASE_ADDRESS/$DATABASE_DB --spring.datasource.username=$DATABASE_USERNAME --spring.datasource.password=$DATABASE_PASSWORD --assets.path=$PATH_TO_FILES
