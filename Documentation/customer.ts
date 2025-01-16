const CustomerSchema = {
    name: 'customer',
    type: 'document',
    title: 'Customer',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Customer Name',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email Address',
      },
      {
        name: 'phone',
        type: 'string',
        title: 'Phone Number',
      },
      {
        name: 'address',
        type: 'string',
        title: 'Shipping Address',
      },
    ],
  };
  export default CustomerSchema;