FROM openjdk:8-alpine
ENV DATABASE_ADDRESS=database
ENV DATABASE_DB=electron
ENV DATABASE_USERNAME=admin
ENV DATABASE_PASSWORD=123321
COPY ./target/electron-shop.jar /tmp/electron-shop.jar
WORKDIR /tmp
RUN echo $DATABASE_ADDRESS
RUN echo $DATABASE_DB
RUN echo $DATABASE_USERNAME
RUN echo $DATABASE_PASSWORD
ENTRYPOINT java -jar electron-shop.jar --spring.datasource.url=jdbc:postgresql://$DATABASE_ADDRESS/$DATABASE_DB --spring.datasource.username=$DATABASE_USERNAME --spring.datasource.password=$DATABASE_PASSWORD
