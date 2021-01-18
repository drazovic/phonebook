package router

import (
	"github.com/gorilla/mux"

	"api/controllers"
)

// GetRouter ...
func GetRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	router = router.PathPrefix("/api/").Subrouter()

	router.HandleFunc("/users/signup", controllers.Signup).Methods("POST")
	router.HandleFunc("/users/login", controllers.Login).Methods("POST")

	router.HandleFunc("/contacts", controllers.GetAllContacts).Methods("GET")
	router.HandleFunc("/contacts", controllers.CreateContact).Methods("POST")
	router.HandleFunc("/contacts/{id}", controllers.EditContact).Methods("PATCH")
	router.HandleFunc("/contacts/{id}", controllers.DeleteContact).Methods("DELETE")

	return router
}
