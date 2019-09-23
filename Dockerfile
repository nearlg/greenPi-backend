FROM node:slim

ARG security_jwt_secret

ARG google_client_id
ARG google_client_secret
ARG google_redir_url

RUN apt-get update && \
    apt-get install -y \
    gcc \
    g++ \
    make \
    python && \
    apt-get clean && \
    npm install -g yarn

WORKDIR /backend

ADD ./ /backend

ENV DATABASE_URI="mongodb://mongo/greenpi" \
    SERVER_NAME="greenpi-backend" \
    SECURITY_BCRYPT_SALT_ROUNDS="10" \
    SECURITY_JWT_SECRET=${security_jwt_secret} \
    GOOGLE_CLIENT_ID=${google_client_id} \
    GOOGLE_CLIENT_SECRET=${google_client_secret} \
    GOOGLE_REDIR_URL=${google_redir_url}

RUN yarn && \
    yarn compile

CMD node dist/src/index.js
