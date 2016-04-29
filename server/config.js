// Hold app secrets and config
module.exports = {
  global: {
    name: "Auth Test"
  },
  development: {
    jwt_secret: process.env.AUTH_TEST_JWT_DEVELOPMENT
  },
  staging: {
    jwt_secret: process.env.AUTH_TEST_JWT_STAGING
  },
  production: {
    jwt_secret: process.env.AUTH_TEST_JWT_PRODUCTION
  },
}
