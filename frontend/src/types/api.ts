
export interface CancelablePromise<T> extends Promise<T> {
    cancel(): void;
}

export interface ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
}

export type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

export type SalesData = {
    year_month?: string;
    sales_turnover?: number;
    inventory_turnover?: number;
    product_id?: number;
};

export type PurchaseOrder = {
    id?: number;
    supplier_id?: string;
    order_date?: string;
    estimated_delivery_date?: string;
    product_id?: number;
    quantity?: number;
    created_at?: string;
};

export type NewPurchaseOrder = {
    supplier_id: string;
    order_date: string;
    estimated_delivery_date?: string;
    product_id: number;
    quantity: number;
};
