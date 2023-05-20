export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwtSecret: process.env.JWT_SECRET,
  stripeApiKey: process.env.STRIPE_SECRET_KEY,
  stripePK: process.env.PUBLISHABLE_KEY,
  mailHost: process.env.MAIL_SERVER,
  mailPort: parseInt(process.env.MAIL_PORT),
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailApiKey: process.env.MAIL_API_KEY,
  
});
