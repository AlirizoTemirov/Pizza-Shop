"use client";

import axios from "axios";
import { useState } from "react";

import Header from "./Header";
import CategoriesSection from "./CategoriesSection";
import Products from "./Products";

export default function HomeClient({ categories, products }: any) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("популярности");

  const handleFilter = async (category: string) => {
    try {
      setActiveCategory(category);

      const url =
        category === "all"
          ? "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products"
          : `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products?category=${category}`;

      const res = await axios.get(url);

      setFilteredProducts(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (type: string) => {
    setSelectedSort(type);

    const sorted = [...filteredProducts];

    if (type === "по цене") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (type === "по алфавиту") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (type === "популярности") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sorted);
  };

  return (
    <div className="container mx-auto pb-10">
      <Header />

      <CategoriesSection
        onSort={handleSort}
        selectedSort={selectedSort}
        activeCategory={activeCategory}
        onFilter={handleFilter}
        categories={categories}
      />

      <Products products={filteredProducts} />
    </div>
  );
}
