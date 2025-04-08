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

func intPointer(i int) *int {
	return &i
}

func stringPointer(s string) *string {
	return &s
}

func toDate(d pgtype.Date) *runtimeTypes.Date {
	return &runtimeTypes.Date{Time: d.Time}
}
