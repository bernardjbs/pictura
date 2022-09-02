const Stripe = require('stripe');

export const Stripe = new Stripe(process.env.STRIPE_KEY);