## Modules

- forRoot(): configuración global (una vez)
- forFeature(): configuración por módulo consumidor

## Initialization order

1. ConfigModule.forRoot()
2. Dynamic Modules (forRoot)
3. Providers
4. Controllers
5. App bootstrap

## Cross cutting concerns

Functionalities needed across the app like:

- Logging
- Data transformation
- Data validation
- Authentication and Authorization
- Error handling

## Middleware vs Interceptors

- **Middleware** executes a request reaches a route handler, needed for tasks that need to occur earlier in the request response cycle like:
  - Log incoming requests
  - Transform incoming requests (body-parsing)
  - Validate incoming request data
  - Authentication (verifying tokens)
- **Interceptors** it has access to the request before and after is process by the route handler, good for tasks like:
  - Measures and log response times
  - Transform responses:
    - Normalize and format data
    - Add metadata (custom header, timestamps)
  - Handle errors
    - Transform and/or exceptions

It can be bind to controller or specific routes or globally (using the main.js file), to affect all request across the app
For this, we just need to add the attribute to the controller like `@UseInterceptors(LoggerInterceptor)`

## Error handling and testing

### Error

**Exception Layer**: It catches all unhandled errors and exceptions in the app

## Security

- CSRF (Cross-Site Request Forgery): An attack that tricks an authenticated user into making unwanted actions on a web app where they are logged in

### Packages

- `@nest/throttler`: Keep track of the incoming requests quantities, to prevent DDoS attacks
