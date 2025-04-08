
import { CancelablePromise, NewPurchaseOrder, PurchaseOrder, SalesData } from "../types/api";

class ApiService {
  private baseUrl = '/api';

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
    // In a real app, this would be a real API call
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
    let controller = new AbortController();
    
    const promise = new Promise<Array<PurchaseOrder>>((resolve) => {
      // Mock data for demonstration
      setTimeout(() => {
        resolve([
          { id: 1, supplier_id: "SUP001", order_date: "2024-04-01", estimated_delivery_date: "2024-04-15", product_id: 1, quantity: 200, created_at: "2024-03-28" },
          { id: 2, supplier_id: "SUP002", order_date: "2024-04-05", estimated_delivery_date: "2024-04-20", product_id: 2, quantity: 150, created_at: "2024-04-01" },
          { id: 3, supplier_id: "SUP003", order_date: "2024-04-10", estimated_delivery_date: "2024-04-25", product_id: 3, quantity: 100, created_at: "2024-04-08" },
          { id: 4, supplier_id: "SUP001", order_date: "2024-04-15", estimated_delivery_date: "2024-04-30", product_id: 4, quantity: 250, created_at: "2024-04-12" },
        ]);
      }, 500);
    }) as CancelablePromise<Array<PurchaseOrder>>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
  }

  /**
   * Create a new purchase order
   */
  public postPurchaseOrders(
    requestBody: NewPurchaseOrder,
  ): CancelablePromise<PurchaseOrder> {
    let controller = new AbortController();
    
    const promise = new Promise<PurchaseOrder>((resolve) => {
      // Mock data for demonstration
      setTimeout(() => {
        const newId = Math.floor(Math.random() * 1000) + 5;
        resolve({
          id: newId,
          ...requestBody,
          created_at: new Date().toISOString().split('T')[0]
        });
      }, 500);
    }) as CancelablePromise<PurchaseOrder>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
  }

  /**
   * Delete a purchase order
   */
  public deletePurchaseOrders(
    id: number,
  ): CancelablePromise<void> {
    let controller = new AbortController();
    
    const promise = new Promise<void>((resolve) => {
      // Mock deletion
      setTimeout(() => {
        resolve();
      }, 500);
    }) as CancelablePromise<void>;

    // Add cancel method to the promise
    promise.cancel = () => {
      controller.abort();
    };

    return promise;
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
