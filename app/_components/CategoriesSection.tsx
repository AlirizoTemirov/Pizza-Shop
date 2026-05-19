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
  onFilter: (category: string) => void;
  activeCategory: string;
  selectedSort: string;
  onSort: (type: string) => void;
}

export default function CategoriesSection({
  categories,
  onFilter,
  activeCategory,
  selectedSort,
  onSort,
}: CategoryProps) {
  const sortItems = ["популярности", "по цене", "по алфавиту"];

  return (
    <div className="pl-16.75 pr-12 pt-10 pb-8 flex justify-between items-center">
      <div className="flex items-center gap-2.25">
        <Button
          onClick={() => onFilter("all")}
          className={`py-4 px-5 rounded-2xl cursor-pointer
    ${
      activeCategory === "all"
        ? "bg-black text-white"
        : "bg-gray-100 border border-gray-300 text-black"
    }
  `}
        >
          Все
        </Button>
        {categories.map((category, index) => (
          <Button
            key={category.id}
            onClick={() => onFilter(String(index + 1))}
            className={`py-4 px-5 rounded-2xl cursor-pointer transition
            ${
              activeCategory === String(index + 1)
                ? "bg-black text-white"
                : "text-black bg-gray-100 border border-gray-300"
            }
          `}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">Сортировка по:</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-orange-500 font-medium outline-none cursor-pointer select-none">
              {selectedSort}
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {sortItems.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => onSort(item)}
                className={
                  selectedSort === item
                    ? "text-orange-500 font-semibold bg-orange-50 cursor-pointer"
                    : "hover:bg-gray-100 cursor-pointer transition-all"
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
