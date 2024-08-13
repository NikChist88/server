export const getCorsConfig = () => {
  return {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    exposeHeaders: 'set-cookie',
    credentials: true,
  }
}
