"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [pizzaType, setPizzaType] = useState("тонкое");
  const [pizzaSize, setPizzaSize] = useState("26");
  const { cart } = useCartStore();

  const addedCount = cart
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.count, 0);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="w-70">
      <img
        className="w-64.75 h-65 mx-auto"
        src={product.imageUrl}
        alt={product.title}
      />
      <h1 className="text-[20px] font-bold pt-2.75 pb-5.5 text-center">
        {product.title}
      </h1>

      <div className="bg-[#F3F3F3] p-1 rounded-lg">
        <ToggleGroup
          value={pizzaType}
          onValueChange={(value) => {
            if (value) setPizzaType(value);
          }}
          type="single"
          defaultValue="тонкое"
          spacing={2}
        >
          <ToggleGroupItem
            value="тонкое"
            aria-label="sdasd"
            className="rounded-lg w-32.75 h-8 data-[state=on]:bg-white cursor-pointer"
          >
            тонкое
          </ToggleGroupItem>

          <ToggleGroupItem
            value="традиционное"
            className="rounded-lg w-32.75 h-8 data-[state=on]:bg-white cursor-pointer"
          >
            традиционное
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          className="mt-2"
          type="single"
          value={pizzaSize}
          onValueChange={(value) => {
            if (value) setPizzaSize(value);
          }}
          defaultValue="26"
          spacing={2}
        >
          <ToggleGroupItem
            value="26"
            aria-label="sdasd"
            className="rounded-lg w-21.5 h-8 data-[state=on]:bg-white cursor-pointer"
          >
            26 cm.
          </ToggleGroupItem>

          <ToggleGroupItem
            value="30"
            className="rounded-lg w-21.5 h-8 data-[state=on]:bg-white cursor-pointer"
          >
            30 cm.
          </ToggleGroupItem>
          <ToggleGroupItem
            value="40"
            className="rounded-lg w-21.5 h-8 data-[state=on]:bg-white cursor-pointer"
          >
            40 cm.
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="mt-4.25 flex justify-between items-center">
        <h1 className="text-[20px] font-bold">от {product.price} ₽</h1>
        <Button
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              sizes: parseInt(pizzaSize),
              types: pizzaType,
              count: 1,
            })
          }
          className="py-2.75 px-4.25 cursor-pointer rounded-2xl bg-white border-[#EB5A1E] text-[#EB5A1E] hover:bg-[#EB5A1E] hover:text-white"
          variant={"outline"}
        >
          + Добавить
          {addedCount > 0 && (
            <div className="ml-2 min-w-5 h-5 px-1 rounded-full bg-[#FE5F1E] text-white flex items-center justify-center text-xs">
              {addedCount}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
