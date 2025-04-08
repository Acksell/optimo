package optimo

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/acksell/optimo/backend/api"
	"github.com/acksell/optimo/backend/optimosql"
)

type Service struct {
	// getting issues with locks, https://github.com/jackc/pgx/issues/2100
	mu sync.Mutex
	db *optimosql.Queries
}

func New(db *optimosql.Queries) *Service {
	return &Service{sync.Mutex{}, db}
}

var _ api.ServerInterface = &Service{}

func (s *Service) GetPurchaseOrders(w http.ResponseWriter, r *http.Request) {
	s.mu.Lock()
	defer s.mu.Unlock()
	pos, err := s.db.ListPurchaseOrders(r.Context())
	if err != nil {
		log.Printf("list purchase orders: %v", err)
		http.Error(w, fmt.Sprintf("failed to fetch purchase orders: %v", err), http.StatusInternalServerError)
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
	s.mu.Lock()
	defer s.mu.Unlock()

	var newOrder api.NewPurchaseOrder
	if err := json.NewDecoder(r.Body).Decode(&newOrder); err != nil {
		log.Printf("decode purchase order: %v", err)
		http.Error(w, fmt.Sprintf("Invalid request payload: %v", err), http.StatusBadRequest)
		return
	}

	if err := s.db.CreatePurchaseOrder(r.Context(), fromPurchaseOrder(newOrder)); err != nil {
		log.Printf("create purchase order: %v", err)
		http.Error(w, fmt.Sprintf("failed to create purchase order: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func (s *Service) DeletePurchaseOrdersId(w http.ResponseWriter, r *http.Request, id int) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if err := s.db.DeletePurchaseOrder(r.Context(), int32(id)); err != nil {
		log.Printf("delete purchase order: %v", err)
		http.Error(w, fmt.Sprintf("failed to delete purchase order: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (s *Service) GetSales(w http.ResponseWriter, r *http.Request, params api.GetSalesParams) {
	s.mu.Lock()
	defer s.mu.Unlock()

	var sales []api.SalesData
	if params.ProductIds == nil || len(*params.ProductIds) == 0 {
		s, err := s.db.MonthSales(r.Context(), optimosql.MonthSalesParams{
			SaleDate:   fromDate(params.StartDate),
			SaleDate_2: fromDate(params.EndDate),
		})
		if err != nil {
			log.Printf("list sales: %v", err)
			http.Error(w, fmt.Sprintf("failed to fetch sales: %v", err), http.StatusInternalServerError)
			return
		}
		for _, sale := range s {
			sales = append(sales, toSalesData(sale))
		}
	} else {
		s, err := s.db.MonthSalesFiltered(r.Context(), optimosql.MonthSalesFilteredParams{
			SaleDate:   fromDate(params.StartDate),
			SaleDate_2: fromDate(params.EndDate),
			Column3:    fromInts(params.ProductIds),
		})
		if err != nil {
			log.Printf("list sales: %v", err)
			http.Error(w, fmt.Sprintf("failed to fetch sales: %v", err), http.StatusInternalServerError)
			return
		}
		for _, sale := range s {
			sales = append(sales, toSalesDataFiltered(sale))
		}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(sales); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
