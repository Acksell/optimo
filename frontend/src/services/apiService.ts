
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
    // return DefaultService.getSales(startDate, endDate, productIds)
    // todo replace with db call once datepicker parser is fixed.
    let controller = new AbortController();

    const promise = new Promise<Array<SalesData>>((resolve) => {
      // Mock data for demonstration
      setTimeout(() => {
        const mockProducts = [1, 2, 3, 4];
        let data: Array<SalesData> = [
          { year_month: '2024-01', sales_turnover: 12000, inventory_turnover: 800, product_id: 1 },
          { year_month: '2024-02', sales_turnover: 15000, inventory_turnover: 900, product_id: 1 },
          { year_month: '2024-03', sales_turnover: 18000, inventory_turnover: 1000, product_id: 1 },
          { year_month: '2024-04', sales_turnover: 22000, inventory_turnover: 1100, product_id: 1 },
          { year_month: '2024-01', sales_turnover: 8000, inventory_turnover: 600, product_id: 2 },
          { year_month: '2024-02', sales_turnover: 9000, inventory_turnover: 700, product_id: 2 },
          { year_month: '2024-03', sales_turnover: 11000, inventory_turnover: 750, product_id: 2 },
          { year_month: '2024-04', sales_turnover: 13000, inventory_turnover: 800, product_id: 2 },
          { year_month: '2024-01', sales_turnover: 5000, inventory_turnover: 300, product_id: 3 },
          { year_month: '2024-02', sales_turnover: 6000, inventory_turnover: 350, product_id: 3 },
          { year_month: '2024-03', sales_turnover: 7000, inventory_turnover: 400, product_id: 3 },
          { year_month: '2024-04', sales_turnover: 9000, inventory_turnover: 450, product_id: 3 },
          { year_month: '2024-01', sales_turnover: 18000, inventory_turnover: 1200, product_id: 4 },
          { year_month: '2024-02', sales_turnover: 20000, inventory_turnover: 1250, product_id: 4 },
          { year_month: '2024-03', sales_turnover: 24000, inventory_turnover: 1300, product_id: 4 },
          { year_month: '2024-04', sales_turnover: 28000, inventory_turnover: 1400, product_id: 4 },
          { year_month: '2025-01', sales_turnover: 2*12000, inventory_turnover: 800, product_id: 1 },
          { year_month: '2025-02', sales_turnover: 2*15000, inventory_turnover: 900, product_id: 1 },
          { year_month: '2025-03', sales_turnover: 2*18000, inventory_turnover: 1000, product_id: 1 },
          { year_month: '2025-04', sales_turnover: 2*22000, inventory_turnover: 1100, product_id: 1 },
          { year_month: '2025-01', sales_turnover: 2*8000, inventory_turnover: 600, product_id: 2 },
          { year_month: '2025-02', sales_turnover: 2*9000, inventory_turnover: 700, product_id: 2 },
          { year_month: '2025-03', sales_turnover: 2*11000, inventory_turnover: 750, product_id: 2 },
          { year_month: '2025-04', sales_turnover: 2*13000, inventory_turnover: 800, product_id: 2 },
          { year_month: '2025-01', sales_turnover: 2*5000, inventory_turnover: 300, product_id: 3 },
          { year_month: '2025-02', sales_turnover: 2*6000, inventory_turnover: 350, product_id: 3 },
          { year_month: '2025-03', sales_turnover: 2*7000, inventory_turnover: 400, product_id: 3 },
          { year_month: '2025-04', sales_turnover: 2*9000, inventory_turnover: 450, product_id: 3 },
          { year_month: '2025-01', sales_turnover: 2*18000, inventory_turnover: 1200, product_id: 4 },
          { year_month: '2025-02', sales_turnover: 2*20000, inventory_turnover: 1250, product_id: 4 },
          { year_month: '2025-03', sales_turnover: 2*24000, inventory_turnover: 1300, product_id: 4 },
          { year_month: '2025-04', sales_turnover: 2*28000, inventory_turnover: 1400, product_id: 4 },
          
        ];

        // Apply filters if specified
        if (startDate) {
          data = data.filter(item => item.year_month! >= startDate);
        }
        if (endDate) {
          data = data.filter(item => item.year_month! <= endDate);
        }
        if (productIds && productIds.length > 0) {
          data = data.filter(item => productIds.includes(item.product_id!));
        }

        resolve(data);
      }, 500);
    }) as CancelablePromise<Array<SalesData>>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
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
          { id: 1, name: "Jeans" },
          { id: 2, name: "Shirt" },
          { id: 3, name: "Polo" },
          { id: 4, name: "Socks" }
        ]);
      }, 0);
    }) as CancelablePromise<Array<{ id: number, name: string }>>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
  }
}

export const apiService = new ApiService();
