export default () => ({
  port: process.env.PORT ?? 4201,
  maxCartItems: process.env.MAX_CART_ITEMS ?? 10,
  dateFormat: process.env.DATE_FORMAT ?? 'YYYY-MM-DD',
})