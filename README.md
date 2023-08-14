# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Preparing

#### Downloading

```
git clone https://github.com/istairina/nodejs2023Q2-service.git
```

#### Changing folder

```
cd nodejs2023Q2-service
```

#### Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

The app is starting by default on port 4000. It's possible to change the port in .env file.

#### Making the .env file from exaple

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

## Testing

**After the application is running** open new terminal (in vscode windows is _ctrl + shift + 5_) and enter:

```
npm run test
```
