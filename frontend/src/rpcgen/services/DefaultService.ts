/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewPurchaseOrder } from '../models/NewPurchaseOrder';
import type { PurchaseOrder } from '../models/PurchaseOrder';
import type { SalesData } from '../models/SalesData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get sales data aggregated by month
     * Returns a list of sales aggregated by month. Optionally filter by product IDs.
     * @param startDate Filter sales starting from this date (inclusive)
     * @param endDate Filter sales up to this date (inclusive)
     * @param productIds Filter sales by one or more product IDs
     * @returns SalesData Successful response with aggregated sales
     * @throws ApiError
     */
    public static getSales(
        startDate?: string,
        endDate?: string,
        productIds?: Array<number>,
    ): CancelablePromise<Array<SalesData>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sales',
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'product_ids': productIds,
            },
        });
    }
    /**
     * List all purchase orders
     * Returns all purchase orders with supplier, product, and delivery info.
     * @returns PurchaseOrder A list of purchase orders
     * @throws ApiError
     */
    public static getPurchaseOrders(): CancelablePromise<Array<PurchaseOrder>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/purchase-orders',
        });
    }
    /**
     * Create a new purchase order
     * @param requestBody
     * @returns PurchaseOrder Purchase order created
     * @throws ApiError
     */
    public static postPurchaseOrders(
        requestBody: NewPurchaseOrder,
    ): CancelablePromise<PurchaseOrder> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/purchase-orders',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a purchase order
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePurchaseOrders(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/purchase-orders/{id}',
            path: {
                'id': id,
            },
        });
    }
}
