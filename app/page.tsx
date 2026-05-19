import axios from "axios";
import HomeClient from "./_components/HomeClient";

export default async function Home() {
  const { data: CategoryData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories"
  );

  const { data: ProductData } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products"
  );

  return (
    <HomeClient
      categories={CategoryData.result}
      products={ProductData.result}
    />
  );
}
