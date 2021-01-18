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

	router.Use(handlers.JwtAuthentication) //attach JWT auth middleware

	handler := cors.Default().Handler(router)

	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		fmt.Print(err)
	}
}
