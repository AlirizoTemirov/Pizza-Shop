"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CategoryProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoryProps) {
  const sortItems = ["популярности", "по цене", "по алфавиту"];
  const [selected, setSelected] = useState(sortItems[0]);

  return (
    <div className="pl-16.75 pr-12 pt-10 pb-8 flex justify-between items-center">
      <div className="flex items-center gap-2.25">
        <Button className="py-4 px-5 rounded-2xl">Все</Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={"outline"}
            className="py-4 px-5 rounded-2xl"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">Сортировка по:</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-orange-500 font-medium outline-none">
              {selected}
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {sortItems.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setSelected(item)}
                className={
                  selected === item
                    ? "text-orange-500 font-semibold bg-orange-50"
                    : ""
                }
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
