
---

# **Template 2 Product API - GET /api/products**

### **Base URL:**
```
https://hackathon-apis.vercel.app/api/products
```

### **Description:**
This endpoint retrieves a list of products available in the store. Each product includes detailed information such as the product's name, description, price, category, initial quantity, tags, and an image URL. The response provides an array of products in JSON format.

### **Example Response:**
```json
[
  {
    "name": "The Poplar suede sofa",
    "description": "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
    "image": "https://cdn.sanity.io/images/ri847jqu/production/9b6a4fc8c65bbb4e5793fb0e1116b510d73dc9e8-630x375.png",
    "_id": "65453ffd-e476-4b6b-a388-7e3de1bb632a",
    "features": [
        "Premium material",
        "Handmade upholster",
        "Quality timeless classic"
    ],
    "dimensions": {
        "width": "110cm",
        "height": "110cm",
        "depth": "50cm"
    },
    "category": {
        "name": "Tableware",
        "slug": "tableware"
    },
    "price": 980,
    "tags": [
        "popular products"
    ]
  }
]
```

### **Response Fields:**
- **_id** (string): The unique identifier for the product.
- **name** (string): The name of the product.
- **description** (string): A detailed description of the product, including key features.
- **price** (number): The price of the product (in the store's currency).
- **category** (string): The category to which the product belongs (e.g., chairs, tables).
- **image** (string): A URL to an image of the product.
- **tags** (string array): Tags to get the products of particular sections.
- **features** (string array): include extra detail about product.
- **dimensions** (string array): include the dimensions of product.

---

## **Importing API Data into Your Sanity Project**

To import the data from the `/api/products` endpoint into your Sanity project, you can follow these steps:

### 1. clone this repo `https://github.com/bilalmk/hackathon-template02.git` using following command:
```
git clone https://github.com/bilalmk/hackathon-template02.git
```

### 2. Navigate to the sanity-migration folder and run the following command
```
npm install
```

### 3. create a .env in sanity-migration folder and define following three variables and values
- **projectId**: Your Sanity project ID.
- **dataset**: Your Sanity dataset name.
- **token**: Your Sanity token (if required).

### 4. Run the Script:
```
node importData.js
```

This will fetch the data from the API and import it into your Sanity project.

---

## **Following are the schema you can use to update sanity records after migration**
```
https://github.com/bilalmk/hackathon-template02/blob/main/schema/category.ts
https://github.com/bilalmk/hackathon-template02/blob/main/schema/product.ts
```