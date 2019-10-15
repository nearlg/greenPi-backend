# GreenPi backend ![Build status](https://github.com/gabrielmdc/greenpi-backend/workflows/Master%20push/badge.svg)

This project is the backend of the project GreenPi, it saves the historical and configuration of GreenPi system.

## Table of contents:

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Docker image repositories](#Docker%20image%20repositories)
- [How to use the Docker images](#How%20to%20use%20the%20Docker%20images)
  - Pull simple image
  - Using _docker-compose_
- [License](#License)

## Requirements

You must to set-up some environment variables:

_Mandatory:_

- **DATABASE_URI**: The URI of MongoDb instance
- **GOOGLE_CLIENT_ID**: This is used for the Google authentication
- **GOOGLE_CLIENT_SECRET**: This is used for the Google authentication
- **GOOGLE_REDIR_URL**: This is used for the Google authentication
- **SECURITY_JWT_SECRET**: This is used to encrypt the JWT Token

_Optional:_

- **SECURITY_BCRYPT_SALT_ROUNDS**: An integer used for encrypt data
- **PORT**: The server port
- **SERVER_NAME**: The server name. By default, the field _name_ from package.json is used
- **DATABASE_URI_TEST**: The URI of MongoDb instance. Used only for unit testing

For the develop environment, you can add a _nodemon.json_ file which is not tracked by GIT. More info [here](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)

Example (_nodemon.json_):

```json nodemon.json
{
  "env": {
    "DATABASE_URI": "mongo db url",
    "GOOGLE_CLIENT_ID": "xxx",
    "GOOGLE_CLIENT_SECRET": "xxx",
    "GOOGLE_REDIR_URL": "redir url",
    "SECURITY_JWT_SECRET": "xxx"
  }
}
```

## Using the Docker image

There are some official [repositories](#Docker%20image%20repositories).

```bash
docker pull gmdcwork/greenpi-backend:[version]
# Please set the correct variable values
docker run --name greenpi-backend-instance \
  -e DATABASE_URI='mongodb://mongo/greenpi-backend' \
  -e GOOGLE_CLIENT_ID="" \
  -e GOOGLE_CLIENT_SECRET="" \
  -e GOOGLE_REDIR_URL="" \
  -e SECURITY_JWT_SECRET="" \
  -d greenpi-backend:[version]
```

## Installation

```bash
yarn install
```

## Run

Start the application in _production_ mode:

```bash
yarn start:prod
```

The command `yarn start` is similar but it does not set the environment variable `NODE_ENV`.

## Admin user

This step is only necessary for the first admin!

In order to create an admin user, you must have to get access to the database and in the collection _User_, modify the field roleName to _Admin_

Now the user has the _Admin_ privileges.

## Build Docker container

You can use an [official docker image](#Docker%20image%20repositories) Docker image repositories:

```bash
yarn build
```

Now you could run the Docker image. [Example explained](#Using%20the%20Docker%20image)

## Docker image repositories

There are two repositories:

- [Git package registry](https://github.com/gabrielmdc/greenpi-backend/packages)
- [DockerHub](https://cloud.docker.com/u/gmdcwork/repository/docker/gmdcwork/greenpi-backend)

## Credits

Author: [Gabriel MDC](https://github.com/gabrielmdc/)

## License

[MIT](./LICENSE)
