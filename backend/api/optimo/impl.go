package optimo

import (
	"encoding/json"
	"net/http"

	"github.com/acksell/optimo/backend/api"
	"github.com/acksell/optimo/backend/optimosql"
)

type Service struct {
	// postgres client connection
	db *optimosql.Queries
}

func New(db *optimosql.Queries) *Service {
	return &Service{db}
}

var _ api.ServerInterface = &Service{}

func (s *Service) GetPurchaseOrders(w http.ResponseWriter, r *http.Request) {
	pos, err := s.db.ListPurchaseOrders(r.Context())
	if err != nil {
		http.Error(w, "Failed to fetch purchase orders", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	apiPurchaseOrders := make([]api.PurchaseOrder, len(pos))
	for i, po := range pos {
		apiPurchaseOrders[i] = toPurchaseOrder(po)
	}

	if err := json.NewEncoder(w).Encode(apiPurchaseOrders); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (s *Service) PostPurchaseOrders(w http.ResponseWriter, r *http.Request) {

}

func (s *Service) DeletePurchaseOrdersId(w http.ResponseWriter, r *http.Request, id int) {

}

func (s *Service) GetSales(w http.ResponseWriter, r *http.Request, params api.GetSalesParams) {

}
