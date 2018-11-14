FROM node:slim

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
    SECURITY_JWT_SECRET="secret-JWT_by+DefaulT"

RUN npm install && \
    npm run compile

CMD node src/index.js
