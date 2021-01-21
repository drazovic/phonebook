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

	dbURI := username + ":" + password + "@/" + "?parseTime=true"

	conn, err := gorm.Open("mysql", dbURI)
	if err != nil {
		fmt.Print(err)
	}

	// If there is no database create one and use it
	conn = conn.Exec("CREATE DATABASE IF NOT EXISTS " + dbName)
	conn = conn.Exec("USE " + dbName)

	db = conn

	//Database migration
	db.Debug().AutoMigrate(&User{}, &Contact{}) 
}

// GetDB returs created DB object
func GetDB() *gorm.DB {
	return db
}
