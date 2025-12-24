## Modules

- forRoot(): configuración global (una vez)
- forFeature(): configuración por módulo consumidor

## Initialization order

1. ConfigModule.forRoot()
2. Dynamic Modules (forRoot)
3. Providers
4. Controllers
5. App bootstrap
