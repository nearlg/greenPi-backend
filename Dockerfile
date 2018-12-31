FROM node:slim

ARG google_client_id
ARG security_jwt_secret

RUN apt-get update && \
    apt-get install -y \
        gcc \
        g++ \
        make \
        python && \
    apt-get clean

WORKDIR /backend

ADD ./ /backend

ENV DATABASE_URI="mongodb://mongo/greenpi" \
    SERVER_NAME="greenpi-backend" \
    SECURITY_BCRYPT_SALT_ROUNDS="10" \
    SECURITY_JWT_SECRET=${security_jwt_secret} \
    GOOGLE_CLIENT_ID=${google_client_id}

RUN npm install && \
    npm run compile

CMD node src/index.js
