export default {
  jwt: {
    secret: process.env.TOKEN_HASH,
    expiration: '1d',
  },
};
