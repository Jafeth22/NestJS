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

## Deployments

Ways to implement CI/CD pipelines:

- IaaS (Infrastructure as a Service): it only provides the infrastructure; provision and manage virtual machines and other resources on cloud providers like AWS, Azure, GCP, it only requires managing the OS, runtime, and application
- PaaS (Platform as a Service): Use platforms like Heroku, AWS Elastic Beanstalk, Google App Engine to deploy applications without managing the underlying infrastructure
- Containerization: Use Docker to containerize the application and deploy it using orchestration tools like Kubernetes
- Serverless: Deploy functions using serverless platforms like AWS Lambda, Azure Functions, Google Cloud Functions
- VPS (Virtual Private Server): Use services like DigitalOcean, Linode to deploy and manage applications on virtual servers

### Packages

- `@nest/throttler`: Keep track of the incoming requests quantities, to prevent DDoS attacks

### Others

- **ThrottlerGuard**  
A guard that can be used to limit the number of requests a client can make within a certain time period. It helps protect the application from abuse and ensures fair usage of resources. It can be applied globally, at the controller level, or at the route level, using decorators like `@UseGuards(ThrottlerGuard)` or `@Throttle()`.

- **How can you expose shared services (for example, logging) while keeping internal services private within a module?**  
Export only the shared services in the module’s exports array. To expose shared services while keeping internal services private, you can use the `exports` array in a module's `@Module` decorator. Services listed in the `exports` array are made available to other modules that import the current module, but they remain private within the module itself.

- **What is the difference between `forRoot()` and `forFeature()` methods in NestJS modules?**  
`forRoot()` is used to configure and initialize a module with global settings, typically called once in the root module of the application. `forFeature()` is used to configure a module with specific features or settings, usually called in feature modules to provide additional functionality.

- **Which approach is best for including metadata fields like timestamps in API responses across all endpoints to ensure consistent formatting?**  
Use a global interceptor, allows you to consistently format API responses and include metadata fields like timestamps without having to modify each controller or route individually.

- **App that must handle high traffic efficiently. Which configuration improves response times by avoiding repeated expensive computations for the same requests?**  
`CacheModule.register({ store: 'memory', ttl: 3600 })`  
Using caching mechanisms to store frequently accessed data in memory, reducing the need for repeated computations and improving response times.

- **How can you secure HTTP headers in a NestJS application using an Express middleware function like Helmet?**  
Use `app.use(helmet())` to apply default security headers provided by Helmet, enhancing the security of the application by protecting against common web vulnerabilities.

- **Best way to log all unhandled exceptions**  
Use a global exception filter. This allows you to catch and log all unhandled exceptions in a centralized manner, ensuring that errors are consistently recorded for debugging and monitoring purposes.

- **Return structured responses for all unhandled exceptions in your NestJS application?**  
Create a global exception filter. This filter can catch unhandled exceptions and format the responses in a consistent structure before sending them back to the client.

- **Most secure method for storing passwords**  
With `bcrypt.hash()` function. Bcrypt is a widely used hashing algorithm that incorporates salting and multiple rounds of hashing, making it more resistant to brute-force attacks compared to simpler hashing methods.

- **A service must generate a new instance for each HTTP request. Which injection scope should you use?**
Use `@Injectable({ scope: Scope.REQUEST })` to ensure a new instance is created for each HTTP request.

- **How can test-driven development (TDD) ensure a successful refactor of a legacy service in a NestJS application?**  
Write tests for current behavior. By writing tests that cover the existing functionality of the legacy service, you can ensure that any refactoring does not introduce regressions or break existing behavior.

- **How should you configure the controller to handle optional filters like sort and page while maintaining clean, maintainable routes?**  
Use the `@Query` decorator in the route handler. This allows you to define optional query parameters for filtering, sorting, and pagination without cluttering the route definitions.

- **What is the primary purpose of NestJS modules?**  
To organize the application structure into cohesive blocks of functionality, encapsulating related components such as controllers, providers, and services.

- **What is dynamic module in NestJS?**  
A dynamic module is a module that can be configured at runtime using the `@Module` decorator with the `forRoot()` or `forFeature()` methods. It allows for flexible and reusable module configurations, enabling modules to be customized based on specific requirements or environment settings.

- **What is the difference between a NestJS provider and a service?**  
A `provider` is a broader concept that encompasses any class, value, or factory that can be injected into other components, while a `service` is a specific type of provider that typically contains business logic and is decorated with the `@Injectable()` decorator.

- **How can you implement cross-cutting concerns like logging and error handling in a NestJS application?**  
By using middleware and interceptors. Middleware can handle tasks like logging incoming requests, while interceptors can manage error handling and response transformation across the application.

- **Which strategy ensures services (for example, password hashing) remain private within the module?**   
Do not export the service in the module’s exports array. By omitting the service from the `exports` array, it remains private to the module and cannot be accessed by other modules that import it.

- **You need to structure shared services and features for reuse across multiple modules. What is the best approach?**    
Create a shared module and export shared services. This allows you to centralize shared functionality and easily import it into other modules as needed.

- **A large-scale NestJS application requires you to organize modules to manage growing complexity**    
Use feature-based modules with clear boundaries. This approach helps maintain a modular structure, making it easier to manage and scale the application as it grows.
