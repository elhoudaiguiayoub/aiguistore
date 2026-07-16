export type ProductColor = {
  name: string;
  hex: string;
  images: string[];
};
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  colors: ProductColor[];
};


export type CartItem = Product & {
  cartId: string;
  qty: number;
  size: string;
  color: string;
  image: string;
};