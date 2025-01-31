// schemas/order.js

export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'clientId',
      title: 'Client ID',
      type: 'string',
    },
    {
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productTitle',
              title: 'Product Title',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'streetAddress', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'zipCode', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
      ],
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
    },
  ],
};
