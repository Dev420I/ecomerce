'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({stripe}) => ({
  async create(ctx){
    const { products, userName, email } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product)=> {
          const item = await stripe
            .service("api::item.item")
            .findOne(product.id)
          return {
            price_data: {
              currency: "usd",
              product_data:{
                name: item.name
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          }
        })
      );
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        node: 'payment',
        success_url: 'http://localhost:3000/checkout/success',
        cancel_url: 'http://localhost3000',
        line_items: lineItems,
      });

      await stripe
        .service('api::order.order').create({
        date: {  userName, products, stripeSessionId: session.id },
      })

      return{id: session.id}
    } catch (error) {
      ctx.response.status = 500;
      return { error: {message: 'There was a problem creating the charge.'}}
    }
  },
}));
