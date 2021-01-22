package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"api/handlers"
	"api/models"
	u "api/utils"

	"github.com/gorilla/mux"
)

// CreateContact creates new contact for authenticated user
func CreateContact(w http.ResponseWriter, r *http.Request) {
	authenticatedUserID := r.Context().Value(handlers.AuthenticatedUserIDKey).(uint) //Grab the id of the user that send the request
	contact := &models.Contact{}

	err := json.NewDecoder(r.Body).Decode(contact)
	if err != nil {
		u.Respond(w, u.Message(false, "Error while decoding request body"))
		return
	}

	contact.UserID = authenticatedUserID
	resp := contact.Create()
	u.Respond(w, resp)
}

// GetAllContacts fetches all contacts for authenticated user
func GetAllContacts(w http.ResponseWriter, r *http.Request) {
	authenticatedUserID := r.Context().Value(handlers.AuthenticatedUserIDKey).(uint) //Grab the id of the user that send the request

	data := models.GetContacts(authenticatedUserID)
	resp := u.Message(true, "success")
	resp["data"] = data
	u.Respond(w, resp)
}

// EditContact  updates contact for authenticated user
func EditContact(w http.ResponseWriter, r *http.Request) {
	contactID, error := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
	if error != nil {
		panic(error)
	}
	authenticatedUserID := r.Context().Value(handlers.AuthenticatedUserIDKey).(uint) //Grab the id of the user that send the request
	contact := &models.Contact{}

	err := json.NewDecoder(r.Body).Decode(contact)
	if err != nil {
		u.Respond(w, u.Message(false, "Error while decoding request body"))
		return
	}

	databaseContact := models.GetContact(uint(contactID))

	if databaseContact.UserID != authenticatedUserID {
		u.Respond(w, u.Message(false, "Access denied"))
		return
	}

	models.EditContact(databaseContact, contact)

	updatedContact := models.GetContact(uint(contactID))
	resp := u.Message(true, "success")
	resp["data"] = updatedContact
	u.Respond(w, resp)
}

// DeleteContact  deletes contact for authenticated user
func DeleteContact(w http.ResponseWriter, r *http.Request) {
	contactID, error := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
	if error != nil {
		panic(error)
	}
	authenticatedUserID := r.Context().Value(handlers.AuthenticatedUserIDKey).(uint) //Grab the id of the user that send the request

	databaseContact := models.GetContact(uint(contactID))

	if databaseContact.UserID != authenticatedUserID {
		u.Respond(w, u.Message(false, "Access denied"))
		return
	}

	models.DeleteContact(uint(contactID))
	resp := u.Message(true, "success")
	u.Respond(w, resp)
}
