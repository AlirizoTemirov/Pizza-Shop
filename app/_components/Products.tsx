import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Products {
  products: Product[];
}

export default function Products({ products }: Products) {
  return (
    <div className="pl-16.75 pr-12">
      <h1 className="text-[32px] font-bold select-none">Все пиццы</h1>

      <div className="mt-8.75 grid grid-cols-4 gap-8.75">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
