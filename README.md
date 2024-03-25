# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Preparing

#### Downloading

```
git clone https://github.com/istairina/nodejs2024Q1-service.git
```

#### Changing folder

```
cd nodejs2024Q1-service
```

#### Installing NPM modules

```
npm install
```

#### Making the .env file from example

```
cp .env.example .env
```

#### Open in docker

Make sure that docker is running.
Run containers

```
npm run docker
```

After starting the app on port (4000 as default) you can open
in your browser Swagger OpenAPI documentation by typing http://localhost:4000/doc/.

## Checking docker images size

```
docker images
```

## Testing

**After the application is running** open a new terminal (in vscode windows is _ctrl + shift + 5_) and enter:

```
npm run test
```

## Public Docker Images on DockerHub

```
https://hub.docker.com/r/istairina/nodejs-rss/tags
```
