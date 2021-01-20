package models

import (
	u "api/utils"
	"fmt"
	"regexp"

	"github.com/jinzhu/gorm"
)

// Contact ...
type Contact struct {
	gorm.Model
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone"`
	UserID uint   `json:"user_id"` //The user that this contact belongs to
}

const phoneNumberRegex = `/^[+][0-9]{2,3}-[0-9]{2,3}-[0-9]{7,8}$/`

/*
Validate struct function validate the required parameters sent through the http request body
returns message and true if the requirement is met
*/
func (contact *Contact) Validate() (map[string]interface{}, bool) {
	if len(contact.Name) < 4 {
		return u.Message(false, "First Name should be at least 4 chars long"), false
	}

	if contact.Email == "" {
		return u.Message(false, "Email should be on the payload"), false
	}

	matched, _ := regexp.MatchString(phoneNumberRegex, contact.Phone)
	if contact.Phone == "" && matched {
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
	resp["data"] = contact
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
