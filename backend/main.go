package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/acksell/optimo/backend/api"
	"github.com/acksell/optimo/backend/api/optimo"
	"github.com/acksell/optimo/backend/optimosql"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
)

func main() {
	ctx := context.Background()

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	if dbHost == "" || dbUser == "" || dbPassword == "" || dbName == "" || dbPort == "" {
		log.Fatal("db environment variables are not set")
	}

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)
	fmt.Println("Connecting to database using", connStr)

	conn, err := pgx.Connect(ctx, connStr)
	if err != nil {
		log.Fatalf("failed to connect to database: %v\n", err)
	}
	defer conn.Close(ctx)

	r := chi.NewRouter()
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	})

	queries := optimosql.New(conn)
	optimo := optimo.New(queries)

	mux := api.HandlerFromMux(optimo, r)

	s := &http.Server{
		Handler: mux,
		Addr:    "0.0.0.0:8080",
	}
	log.Print("Server starting on port 8080")
	// And we serve HTTP until the world ends.
	log.Fatal(s.ListenAndServe())
}
