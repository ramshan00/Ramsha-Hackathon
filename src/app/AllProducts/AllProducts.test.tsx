// import { render, screen, waitFor } from "@testing-library/react";
// import Products from "./page"; // Adjust the import path if needed
// import { client } from "@/sanity/lib/client"; // Import the mocked client
// import "@testing-library/jest-dom"; // Extend Jest's assertions for DOM elements

// jest.mock("@/sanity/lib/client", () => ({
//   client: {
//     fetch: jest.fn(),
//   },
// }));

// jest.mock("next/link", () => {
//     return ({ children, ...rest }: any) => <a {...rest}>{children}</a>;
//   });
  

// jest.mock("next/image", () => ({ src, alt, ...rest }: any) => (
//   <img src={src} alt={alt} {...rest} />
// )); // Mock Next.js Image

// describe("Products Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should render the product list", async () => {
//     // Mocked data for the test
//     const mockedProducts = [
//       {
//         _id: "1",
//         name: "Product 1",
//         price: 100,
//         imageUrl: "https://example.com/product1.jpg",
//       },
//       {
//         _id: "2",
//         name: "Product 2",
//         price: 200,
//         imageUrl: "https://example.com/product2.jpg",
//       },
//     ];

//     // Mock the Sanity client `fetch` method
//     (client.fetch as jest.Mock).mockResolvedValue(mockedProducts);

//     // Render the component
//     render(<Products />);

//     // Assert that the loading state or empty state appears (if applicable)
//     expect(screen.queryByText("Loading...")).toBeNull();

//     // Wait for the products to be fetched
//     await waitFor(() => {
//       expect(screen.getByText("Product 1")).toBeInTheDocument();
//       expect(screen.getByText("$100")).toBeInTheDocument();
//       expect(screen.getByAltText("Product 1")).toBeInTheDocument();

//       expect(screen.getByText("Product 2")).toBeInTheDocument();
//       expect(screen.getByText("$200")).toBeInTheDocument();
//       expect(screen.getByAltText("Product 2")).toBeInTheDocument();
//     });

//     // Ensure the client.fetch was called once with the correct query
//     expect(client.fetch).toHaveBeenCalledTimes(1);
//     expect(client.fetch).toHaveBeenCalledWith(
//       `*[_type == "product"]{
//         _id,
//         name,
//         price,
//         "imageUrl": image.asset->url
//       }`
//     );
//   });

//   it("should display an empty state if no products are available", async () => {
//     // Mock an empty product list
//     (client.fetch as jest.Mock).mockResolvedValue([]);

//     // Render the component
//     render(<Products />);

//     // Wait for the component to finish fetching
//     await waitFor(() => {
//       expect(screen.getByText("No products found.")).toBeInTheDocument();
//     });
//   });

//   it("should handle errors gracefully", async () => {
//     // Mock an error response
//     (client.fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

//     // Render the component
//     render(<Products />);

//     // Wait for the error to appear
//     await waitFor(() => {
//       expect(screen.getByText("Error loading products.")).toBeInTheDocument();
//     });
//   });
// });
