package models

import (
	"fmt"
	u "server/utils"

	"github.com/jinzhu/gorm"
)

// Contact ...
type Contact struct {
	gorm.Model
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	PhoneNumber string `json:"phoneNumber"`
	UserID      uint   `json:"user_id"` //The user that this contact belongs to
}

/*
Validate struct function validate the required parameters sent through the http request body
returns message and true if the requirement is met
*/
func (contact *Contact) Validate() (map[string]interface{}, bool) {

	if contact.FirstName == "" {
		return u.Message(false, "Contact name should be on the payload"), false
	}

	if contact.LastName == "" {
		return u.Message(false, "Contact name should be on the payload"), false
	}

	if contact.PhoneNumber == "" {
		return u.Message(false, "Phone number should be on the payload"), false
	}

	if contact.UserID <= 0 {
		return u.Message(false, "User is not recognized"), false
	}

	//All the required parameters are present
	return u.Message(true, "success"), true
}

// Create ...
func (contact *Contact) Create() map[string]interface{} {
	if resp, ok := contact.Validate(); !ok {
		return resp
	}

	GetDB().Create(contact)

	resp := u.Message(true, "success")
	resp["contact"] = contact
	return resp
}

// GetContacts ...
func GetContacts(userID uint) []*Contact {
	contacts := make([]*Contact, 0)
	err := GetDB().Table("contacts").Where("user_id = ?", userID).Find(&contacts).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return contacts
}

// GetContact ...
func GetContact(ID uint) *Contact {
	contact := &Contact{}
	err := GetDB().First(contact, ID).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return contact
}

// EditContact ...
func EditContact(databaseContact, updatedContact *Contact) *Contact {
	GetDB().Model(&databaseContact).Updates(&updatedContact)
	return updatedContact
}

// DeleteContact ...
func DeleteContact(contactID uint) {
	GetDB().Delete(&Contact{}, contactID)
	return
}
