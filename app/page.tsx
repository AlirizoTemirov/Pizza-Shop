import axios from "axios";
import CategoriesSection from "./_components/CategoriesSection";
import Header from "./_components/Header";
import Products from "./_components/Products";

export default async function Home() {
  const { data: CategoryData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories"
  );

  const { data: ProductData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products"
  );

  return (
    <div className="container mx-auto pb-10">
      <Header />
      <CategoriesSection categories={CategoryData.result} />
      <Products products={ProductData.result} />
    </div>
  );
}
