export default () => ({
  port: process.env.PORT ?? 4200,
  maxCartItems: process.env.MAX_CART_ITEMS ?? 10,
  dateFormat: process.env.DATE_FORMAT ?? "YYYY-MM-DD",
  jwt: {
    secret: process.env.JWT_SECRET ?? "fallback-value",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  },
});
