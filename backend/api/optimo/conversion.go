package optimo

import (
	"github.com/acksell/optimo/backend/api"
	"github.com/acksell/optimo/backend/optimosql"
	"github.com/jackc/pgx/v5/pgtype"
	runtimeTypes "github.com/oapi-codegen/runtime/types"
)

func toPurchaseOrder(po optimosql.ListPurchaseOrdersRow) api.PurchaseOrder {
	poResp := api.PurchaseOrder{
		Id:         intPointer(int(po.ID)),
		Quantity:   intPointer(int(po.Quantity)),
		SupplierId: stringPointer(po.SupplierID),
	}

	if po.CreatedAt.Valid {
		poResp.CreatedAt = &po.CreatedAt.Time
	}

	if po.EstimatedDeliveryDate.Valid {
		poResp.EstimatedDeliveryDate = toDate(po.EstimatedDeliveryDate)
	}

	if po.OrderDate.Valid {
		poResp.OrderDate = toDate(po.OrderDate)
	}

	return poResp
}

func fromPurchaseOrder(po api.PurchaseOrder) optimosql.CreatePurchaseOrderParams {
	return optimosql.CreatePurchaseOrderParams{
		Quantity:              int32(*po.Quantity),
		SupplierID:            *po.SupplierId,
		OrderDate:             fromDate(po.OrderDate),
		EstimatedDeliveryDate: fromDate(po.EstimatedDeliveryDate),
	}
}

func intPointer(i int) *int {
	return &i
}

func stringPointer(s string) *string {
	return &s
}

func toDate(d pgtype.Date) *runtimeTypes.Date {
	return &runtimeTypes.Date{Time: d.Time}
}

func fromDate(d *runtimeTypes.Date) pgtype.Date {
	if d == nil {
		return pgtype.Date{}
	}
	return pgtype.Date{Time: d.Time, Valid: true}
}

func fromInts(s *[]int) []int32 {
	if s == nil {
		return nil
	}
	ints := make([]int32, len(*s))
	for i, v := range *s {
		ints[i] = int32(v)
	}
	return ints
}

func toSalesData(sale optimosql.MonthSalesRow) api.SalesData {
	data := api.SalesData{
		ProductId:         ptr(int(sale.ProductID)),
		InventoryTurnover: ptr(int(sale.InventoryTurnover)),
		SalesTurnover:     ptr(float32(sale.SalesTurnover)),
	}
	m, err := sale.YearMonth.Value()
	if err != nil {
		return data
	}
	if month, ok := m.(string); ok {
		data.YearMonth = &month
	}
	return data
}

func toSalesDataFiltered(sale optimosql.MonthSalesFilteredRow) api.SalesData {
	data := api.SalesData{
		ProductId:         ptr(int(sale.ProductID)),
		InventoryTurnover: ptr(int(sale.InventoryTurnover)),
		SalesTurnover:     ptr(float32(sale.SalesTurnover)),
	}
	m, err := sale.YearMonth.Value()
	if err != nil {
		return data
	}
	if month, ok := m.(string); ok {
		data.YearMonth = &month
	}
	return data
}

func ptr[T any](v T) *T {
	return &v
}
