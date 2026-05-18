export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  sizes: number[];
  types: number[];
  rating: number;
};

export type Order = {
  id: string;
  name: string;
  location: string;
  phonenumber: string;
  orders: [];
  status: number;
};
