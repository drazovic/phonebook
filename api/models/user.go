package models

import (
	"fmt"
	"os"
	"regexp"
	u "api/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

// Token JWT claims struct
type Token struct {
	UserID uint
	jwt.StandardClaims
}

// User ...
type User struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"password"`
	Token    string `json:"token" sql:"-"`
}

var emailRegex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

//Validate incoming user details...
func (user *User) Validate() (map[string]interface{}, bool) {

	if !emailRegex.MatchString(user.Email) {
		return u.Message(false, "Invalid Email"), false
	}

	if len(user.Password) < 6 {
		return u.Message(false, "Password is required and needs to be at least 6 chars long"), false
	}

	//Email must be unique
	temp := &User{}

	//check for errors and duplicate emails
	err := GetDB().Table("users").Where("email = ?", user.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry"), false
	}
	if temp.Email != "" {
		return u.Message(false, "Email already in use."), false
	}

	return u.Message(false, "Requirement passed"), true
}

// Create ...
func (user *User) Create() map[string]interface{} {
	if resp, ok := user.Validate(); !ok {
		return resp
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	GetDB().Create(user)

	if user.ID <= 0 {
		return u.Message(false, "Failed to create account, connection error.")
	}

	//Create new JWT token for the newly registered account
	tk := &Token{UserID: user.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	user.Token = tokenString

	user.Password = "" //delete password

	response := u.Message(true, "Account has been created")
	response["user"] = user
	return response
}

// Login ...
func Login(email, password string) map[string]interface{} {
	user := &User{}
	err := GetDB().Table("users").Where("email = ?", email).First(user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return u.Message(false, "Email not found")
		}
		fmt.Println(err.Error())
		return u.Message(false, "Connection error. Please retry")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}
	//Worked! Logged In
	user.Password = "" // Empty the password for security reasons

	//Create JWT token
	tk := &Token{UserID: user.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	user.Token = tokenString //Store the token in the response

	resp := u.Message(true, "Logged In")
	resp["user"] = user
	return resp
}
