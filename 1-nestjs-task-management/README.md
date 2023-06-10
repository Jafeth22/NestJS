## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Explanation of some packages

```bash
# Allow us to integrate JWT to NestJs
@nestjs/jwt

# Integrates the passport pack with NestJs Eco-System
@nestjs/passport 

# Core functionality of the library
passport 

# To work both libraries together
passport-jwt

# Integrate passport with jwt, that make the integration much easier
@types/passport-jwt

# Use global environments (Apply only for windows OS)
cross-env

# To create a config module
@nestjs/config
```
