package models

import (
	u "api/utils"
	"os"
	"regexp"
	"time"

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
	Email     string `json:"email"`
	Password  string `json:"password"`
	Token     string `json:"token" sql:"-"`
	ExpiresAt int64  `json:"expiresAt" sql:"-"`
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

	tokenString, tokenExp := createJwtToken(user.ID)

	user.Token = tokenString  //Store the token in the response
	user.ExpiresAt = tokenExp // Store the token expiration timestamp in the response

	user.Password = "" //delete password

	response := u.Message(true, "Account has been created")
	response["data"] = user
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
		return u.Message(false, "Connection error. Please retry")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}
	//Worked! Logged In
	user.Password = "" // Empty the password for security reasons

	tokenString, tokenExp := createJwtToken(user.ID)

	user.Token = tokenString  //Store the token in the response
	user.ExpiresAt = tokenExp // Store the token expiration timestamp in the response

	resp := u.Message(true, "Logged In")
	resp["data"] = user
	return resp
}

func createJwtToken(userID uint) (string, int64) {
	tokenExp := time.Now().Add(time.Hour * 24).Unix()
	tk := &Token{UserID: userID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	return tokenString, tokenExp
}
