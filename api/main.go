package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"

	"api/handlers"
	"api/router"
)

func main() {
	router := router.GetRouter()

	router.Use(handlers.JwtAuthentication) // Handle authentication

	// handle CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	}).Handler(router)

	err := http.ListenAndServe(":8080", corsHandler)
	if err != nil {
		fmt.Print(err)
	}
}
