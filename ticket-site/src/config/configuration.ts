export default () => ({
  port: process.env.PORT ?? 4201,
  dateFormat: process.env.DATE_FORMAT ?? 'YYYY-MM-DD',
});
