
import { CancelablePromise, NewPurchaseOrder, PurchaseOrder, SalesData } from "../types/api";
import { DefaultService } from "../rpcgen/services/DefaultService";
class ApiService {
  /**
   * Get sales data aggregated by month
   * @param startDate Filter sales starting from this date (inclusive)
   * @param endDate Filter sales up to this date (inclusive)
   * @param productIds Filter sales by one or more product IDs
   */
  public getSales(
    startDate?: string,
    endDate?: string,
    productIds?: Array<number>,
  ): CancelablePromise<Array<SalesData>> {
    return DefaultService.getSales(startDate, endDate, productIds)
  }

  /**
   * List all purchase orders
   */
  public getPurchaseOrders(): CancelablePromise<Array<PurchaseOrder>> {
    return DefaultService.getPurchaseOrders()
  }

  /**
   * Create a new purchase order
   */
  public postPurchaseOrders(
    requestBody: NewPurchaseOrder,
  ): CancelablePromise<void> {
    return DefaultService.postPurchaseOrders(requestBody)
  }

  /**
   * Delete a purchase order
   */
  public deletePurchaseOrders(
    id: number,
  ): CancelablePromise<void> {
    return DefaultService.deletePurchaseOrders(id)
  }

  /**
   * Helper method to get available products
   */
  public getProducts(): CancelablePromise<Array<{ id: number, name: string }>> {
    let controller = new AbortController();
    
    const promise = new Promise<Array<{ id: number, name: string }>>((resolve) => {
      // Mock products for demonstration
      setTimeout(() => {
        resolve([
          { id: 1, name: "Product A" },
          { id: 2, name: "Product B" },
          { id: 3, name: "Product C" },
          { id: 4, name: "Product D" }
        ]);
      }, 500);
    }) as CancelablePromise<Array<{ id: number, name: string }>>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
  }
}

export const apiService = new ApiService();
