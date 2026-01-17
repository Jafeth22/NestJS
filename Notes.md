# Nestjs

## Create New Project

- Command to create a new folder
  `nest new projectName`

- Case the command NEST is not recognized, install CLI
  `npm i -g @nestjs/cli`

## Files

- `.prettierrc` = Give format to the code consistently
- `nest-cli` = Allow us to override or add some configuration specific to the project
- `tsconfig.build` = Basically, this is for prod mode, due to here we can override some rules and
  it could reduce the bundle size

## Nest Modules

Each app has at least one module (root or main module). It is the starting point of the app
Modules are effective if they are organized by components, also, it is good to have a folder per module
They are singleton (this is a pattern), which means that a module could be imported by others

**Module** = It is a class with the decorator `@Module`, this decorator provides meta-data that is used by
Nest to organized the app structure

`@Module` = Provide

- Providers: Array of providers to be available within the module via dependency injection
- Controllers: Array of controllers instantiated
- Exports: Array of providers to export modules
- Imports: List of modules required by the current module

## Creating a module, controller or service

- nest [g] [module/controller/service/resource/middleware/interceptors/guard] [name] [--no-spec]
  - g = generate
  - option = Could be replace by another option, see more option typing `nest g --help`
  - module/mo = it will generate a new folder (case it does not exist) an update app.module
  - controller = controller file and update module file
  - service/s = New service file and update module file
  - resource/res = new resource (it creates all the files, controller, modules...)
  - middleware = to create a middleware
  - interceptors = to create an interceptor
  - guard = to create a guard, used for authorization, it determines if a user can access a route or not
  - name = name of the option, for this case, it is the module name
  - no-spec = it means that spec (tests) files won't be created

## Creation of a new section to connect with the DB

1. Create Module
2. Create Service
3. Create Controller
4. Create Entity
5. Create Repository
6. In the new module add:

```js
   ...
   imports: [TypeOrmModule.forFeature([fileNameRepository])],
   ...
```

## Nest Controllers

Responsible for handling incoming HTTP requests and returning responses to the client
Bound to a specific path
Containing handlers, which handle endpoints and request methods (`get`, `post`, `put` `delete`)
Can take advantage of dependency injection to consume providers with same module

`Controller` = It has methods inside it, which each of it has decorator such as @GET, @POST...

## Nest Providers and Services

### Providers

Can be injected into constructors if decorated as an `@Injectable`, via dependency injection
Can be a plain value, class, sync/async factory...
It must be provided to a module for them to be usable
Can be exported from a module and then be available to others modules that imported it

### Services

Defined as providers, but NO all providers are services
Singleton when wrapped with @Injection and provided to a module. That means, the same instance
will be shared across the application - acting as a single source of truth
The main source of business logic.
Here you can add the business logic related to the tasks, something create, update, delete...

### Dependency Injection in NestJs

Any component within the NestJs ecosystem can inject a provider that is decorated with the `@Injectable`
We define the dependency in the constructor for the class. NestJs will take care of the injection for
us, and it will then be available as a Class property.

## Data Transfer Object (DTO)

It is used to encapsulate data, and sent it from one subsystem of an app to another
DTO is not a model definition. It defines the shape of data for a specific case, for example - creating a task
It can be defined using an interface or class
Define it in a class is better than an interface, due to class can be preserved post-compilation, also,
classes allow us to do more and NestJs can refer during run time, but not for interfaces

## Nest Pipes

It operates in the arguments to be processed by the route handler, just before the handler is called
Can perform data transformation or validation
Can return data - either original or modified - which will be passed on the route handler
Can throw exceptions and also, it can be asynchronous

These are classes with @Injectable decorator

Image: Pipes-diagram

## Docker

Create a container
`docker run --name postgress-nest -p 5432:5432 -e POSTGRESS_PASSWORD=postgress -d postgres`

- --name = container name
- -p = port
- -e = Will set a environment variable, this case is POSTGRESS_PASSWORD, and the value postgress
- \*-d = Detached mode, it means if the terminal window is closed, it is going to keep running
- \*postgres = Container name that is stored in the cloud

**Start/stop/remove** a container
`docker container start/stop/rm containerName/Id`

List container started
`docker container ls`

## Object Relacional Mapping (ORM)

ORM is a technique that lets you query and manipulate data from database,
using and object-oriented paradigm

Pros

- Data model in one place - easier to maintain. Less repetition
- Lots of things done automatically - database handling, data types, relations...
- No need to write SQL syntax (easy to learn, hard to master). Using your natural way of coding
- DB abstraction - you can change the db type whenever you wish
- Leverages OOP, therefore things like inheritance are easy to achieve

TypeORM = It is a ORM that can run in NodeJs and be used with JS/TS

## Json Web Token (JWT)

For authorization or secure of exchange of information between parties
Verify that the sender is who claims to be
Signed by the issuer, using a secret or keypair (some algorithm)
JWT can be decoded by anyone, they should not contain sensitive information sush as passwords
It is useful for FE, bacause it could be used to toggle features conditionally.
It should be short live

Once we add the packages related to JWT, add the following on module file

```js
imports: [
...,
PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.register({
secret: 'someSecretHere',
signOptions: {
expiresIn: 3600, //
},
}),
...,
]
```

## Loggers

Some good loggers libraries are:

- Bunyon
- Winston
- Bino

## Configuration

Define values that are loaded upon starting the app (should not be changed during runtime)
Configuration per environment such as: dev, stage, production...
It can be define in many ways (JSON, YAML, XML, env variables...) using custom solutions or
open-source libraries.

## Environment variables

We can define it before start the app, example
With one variable
VARIBALENAME=someValue yarn start:dev
Two or more
VARIBALENAME=someValue VARIBALENAME=someValue yarn start:dev

In case we need to override the value that is located inside the env file, we just override the variable before
the command to start the app

For Windows OS, to set a variable, do some of the following 2 options

- "start:dev": "SET STAGE=dev && nest start --watch"

or

- "start:dev": "cross-env STAGE=dev nest start --watch", // For this, the @nestjs/config pack should be installed

## Resolver

An Resolver is similar to an Controller, this is (Resolver) in the GraphQL side

## Mongo DB Connection

Go to follow URL to create a connection to the DB
https://www.udemy.com/course/nestjs-zero-to-hero/learn/lecture/18675618#content

## Query in a No relational (mongodb) DB

This a query of lesson entity (resolver)

```db
query {
    lesson { # This area fields that will be shown
        name
        startDate
    }
}
```
