package models

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql" //...
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
)

var db *gorm.DB //database

func init() {

	e := godotenv.Load() //Load .env file
	if e != nil {
		fmt.Print(e)
	}

	username := os.Getenv("db_user")
	password := os.Getenv("db_password")
	dbName := os.Getenv("db_name")

	dbURI := username + ":" + password + "@/" + dbName + "?parseTime=true"

	conn, err := gorm.Open("mysql", dbURI)
	if err != nil {
		fmt.Print(err)
	}

	db = conn
	db.Debug().AutoMigrate(&User{}, &Contact{}) //Database migration
}

// GetDB ...
func GetDB() *gorm.DB {
	return db
}
