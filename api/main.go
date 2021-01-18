package main

import (
	"fmt"
	"net/http"

	"api/router"
)

func main() {
	router := router.GetRouter()

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		fmt.Print(err)
	}
}