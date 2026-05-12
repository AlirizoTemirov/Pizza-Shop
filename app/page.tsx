import axios from "axios";
import CategoriesSection from "./_components/CategoriesSection";
import Header from "./_components/Header";
import Products from "./_components/Products";

export default async function Home() {
  const { data: CategoryData } = await axios.get(
    "https://68f11ffe0b966ad50035753d.mockapi.io/categories"
  );

  const { data: ProductData } = await axios.get(
    "https://68f11ffe0b966ad50035753d.mockapi.io/products"
  );

  return (
    <div className="container mx-auto pb-10">
      <Header />
      <CategoriesSection categories={CategoryData} />
      <Products products={ProductData} />
    </div>
  );
}
