
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import React from "react";

interface ProductFilterProps {
  products: { id: number; name: string }[];
  selectedProducts: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  selectedProducts,
  onSelectionChange,
}) => {
  const handleProductClick = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      onSelectionChange(selectedProducts.filter((id) => id !== productId));
    } else {
      onSelectionChange([...selectedProducts, productId]);
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">Product Filter</CardTitle>
            <CardDescription>Select products to view sales data</CardDescription>
          </div>
          {selectedProducts.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedProducts.length > 0 ? (
            products
              .filter((product) => selectedProducts.includes(product.id))
              .map((product) => (
                <Badge key={product.id} variant="secondary">
                  {product.name}
                </Badge>
              ))
          ) : (
            <Badge variant="outline">All Products</Badge>
          )}
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <Checkbox
                id={`product-${product.id}`}
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => handleProductClick(product.id)}
              />
              <label
                htmlFor={`product-${product.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {product.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilter;
