import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Your sanity client
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { name, email, phone, products, total, shippingAddress, paymentMethod } = await request.json();

    // Check if customer exists or create a new one
    const existingCustomerQuery = `*[_type == "customer" && email == $email && name == $name][0]`;
    const existingCustomer = await client.fetch(existingCustomerQuery, { email, name });

    let customer;
    
    if (existingCustomer) {
      customer = existingCustomer;
    } else {
      customer = await client.create({
        _type: 'customer',
        name,
        email,
        phone,
      });
    }

    // Create order with reference to the customer
    const clientId = uuidv4();
    const order = await client.create({
      _type: 'order',
      clientId,
      customer: {
        _type: 'reference',
        _ref: customer._id, // Reference to customer document
      },
      products: products.map((item: { productTitle: string, price: number, quantity: number }) => ({
        _key: uuidv4(),
        productTitle: item.productTitle,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      shippingAddress,
      paymentMethod,
    });

    return NextResponse.json({ message: 'Order created successfully', order }, { status: 200 });
  } catch (err) {
    console.error('Error creating order:', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
