const ProductSchema = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Product Name",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 96,
        },
      },
      {
        name: "price",
        title: "Price",
        type: "number",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "dimensions",
        title: "Dimensions",
        type: "object",
        fields: [
          {
            name: "height",
            title: "Height",
            type: "string",
          },
          {
            name: "width",
            title: "Width",
            type: "string",
          },
          {
            name: "depth",
            title: "Depth",
            type: "string",
          },
        ],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: "inStock",
        title: "In Stock",
        type: "boolean",
        initialValue: true,
      },
    ],
  };
  
  export default ProductSchema;