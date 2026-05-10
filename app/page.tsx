import axios from "axios";
import CategoriesSection from "./_components/CategoriesSection";
import Header from "./_components/Header";

export default async function Home() {
  const { data: CategoryData } = await axios.get(
    "https://68f11ffe0b966ad50035753d.mockapi.io/categories"
  );

  return (
    <div className="container mx-auto">
      <Header />
      <CategoriesSection categories={CategoryData} />
    </div>
  );
}
