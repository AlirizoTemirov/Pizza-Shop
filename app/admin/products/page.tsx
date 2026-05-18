import axios from "axios";
import ProductsTable from "./ProductsTable";

export default async function page() {
  const { data: ProductData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products"
  );

  const { data: CategoryData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories"
  );

  return (
    <div>
      <ProductsTable
        products={ProductData.result}
        categories={CategoryData.result}
      />
    </div>
  );
}
