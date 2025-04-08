package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

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

	// Retry logic for database connection
	maxRetries := 5
	for i := 0; i < maxRetries; i++ {
		conn, err := pgx.Connect(ctx, connStr)
		if err == nil {
			defer conn.Close(ctx)
			queries := optimosql.New(conn)
			optimo := optimo.New(queries)
			r := chi.NewRouter()
			mux := api.HandlerFromMux(optimo, r)

			s := &http.Server{
				Handler: mux,
				Addr:    "0.0.0.0:8080",
			}
			log.Print("Server starting on port 8080")
			log.Fatal(s.ListenAndServe())
			return
		}

		log.Printf("failed to connect to database (attempt %d/%d): %v\n", i+1, maxRetries, err)
		if i < maxRetries-1 {
			log.Print("Retrying in 2 seconds...")
			time.Sleep(2 * time.Second)
		}
	}

	log.Fatal("exceeded maximum retries to connect to the database")
}
