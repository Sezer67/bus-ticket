export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwtSecret: process.env.JWT_SECRET,
  stripeApiKey: process.env.STRIPE_SECRET_KEY,
  stripePK: process.env.PUBLISHABLE_KEY
});
