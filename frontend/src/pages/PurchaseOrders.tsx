
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/apiService";
import { PurchaseOrder } from "@/types/api";
import PurchaseOrderTable from "@/components/purchase-orders/PurchaseOrderTable";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import NewPurchaseOrderForm from "@/components/purchase-orders/NewPurchaseOrderForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const PurchaseOrders = () => {
  const { toast } = useToast();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddingOrder, setIsAddingOrder] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  // Load purchase orders
  const loadPurchaseOrders = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getPurchaseOrders();
      setPurchaseOrders(data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      toast({
        title: "Error",
        description: "Failed to load purchase orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load products for the form
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await apiService.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    loadPurchaseOrders();
  }, []);

  // Handle form submission for new purchase order
  const handleAddPurchaseOrder = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const newPurchaseOrder = await apiService.postPurchaseOrders({
        supplier_id: formData.supplierId,
        order_date: new Date(formData.orderDate).toISOString().split("T")[0],
        estimated_delivery_date: new Date(formData.estimatedDeliveryDate).toISOString().split("T")[0],
        product_id: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
      });

      setPurchaseOrders([...purchaseOrders, newPurchaseOrder]);
      setIsAddingOrder(false);
      toast({
        title: "Success",
        description: "Purchase order added successfully",
      });
    } catch (error) {
      console.error("Error adding purchase order:", error);
      toast({
        title: "Error",
        description: "Failed to add purchase order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deletion of a purchase order
  const handleDeletePurchaseOrder = async (id: number) => {
    try {
      await apiService.deletePurchaseOrders(id);
      setPurchaseOrders(purchaseOrders.filter((order) => order.id !== id));
      toast({
        title: "Success",
        description: "Purchase order deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting purchase order:", error);
      toast({
        title: "Error",
        description: "Failed to delete purchase order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <Button onClick={() => setIsAddingOrder(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Purchase Order
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <PurchaseOrderTable
          purchaseOrders={purchaseOrders}
          products={products}
          onDelete={handleDeletePurchaseOrder}
        />
      )}

      <Sheet open={isAddingOrder} onOpenChange={setIsAddingOrder}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>New Purchase Order</SheetTitle>
            <SheetDescription>
              Create a new purchase order to restock inventory.
            </SheetDescription>
          </SheetHeader>
          <NewPurchaseOrderForm
            products={products}
            onSubmit={handleAddPurchaseOrder}
            isSubmitting={isSubmitting}
            onCancel={() => setIsAddingOrder(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PurchaseOrders;
