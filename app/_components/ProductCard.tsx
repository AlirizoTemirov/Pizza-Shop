import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-70">
      <img
        className="w-64.75 h-65 mx-auto"
        src={product.image}
        alt={product.name}
      />
      <h1 className="text-[20px] font-bold pt-2.75 pb-5.5 text-center">
        {product.name}
      </h1>

      <div className="bg-[#F3F3F3] p-1 rounded-lg">
        <ToggleGroup type="single" defaultValue="тонкое" spacing={2}>
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
          className="py-2.75 px-4.25 cursor-pointer rounded-2xl bg-white border-[#EB5A1E] text-[#EB5A1E] hover:bg-[#EB5A1E] hover:text-white"
          variant={"outline"}
        >
          + Добавить
        </Button>
      </div>
    </div>
  );
}
