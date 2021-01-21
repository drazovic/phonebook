# Phonebook

App for phonebook contact management.

## App parts:
    - Front-end: Angular v11
    - Back-end: Go v1.15
    - Database: MySQL

## Features implemented:
    - Front-end
        Authentication (signup, login, logout, auto login, auto logout, route guard)
        Contacts CRUD operations
        Forms (template-driven, reactive, input validation)
        Routing
        Feature modules
        Lazy loading
        HTTP
        HTTP Interceptor
        Resolver
        ViewChild
        localStorage
        rxjs (observables, subscriptions, operators)
        MVC pattern
        ...
        
    - Back-end
        Routing (with gorilla/mux)
        CORS handling (with rs/cors)
        Database connection (ORM with gorm, auto migration)
        Authentication (via JWT, x/crypto)
        Environment configuration (via joho/dotenv)
        REST standard
        MVC pattern
        ...

## Requirements
1. mySQL database installed and running - https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/

2. go lang installed - https://golang.org/doc/install

3. node.js installed - https://nodejs.org/en/

4. angular cli installed (node.js has to be installed first). In your terminal run:

        npm install -g @angular/cli


## How to run everything
1. Clone this repo
    
2. In terminal run:
        
        cd phonebook/api

3. In terminal run:

        go run main.go

4. In new terminal run:

       // This depends of current directory where you opened the terminal
       cd ../web-app

5. In terminal run:

        ng s

6. Go to http://localhost:4200


## External dependencies
    - Front-end:
        ngx-avatar v4.0.0
        angular material v11
    - Back-end:
        dgrijalva/jwt-go v3.2.0
        go-sql-driver/mysql v1.5.0
        gorilla/mux v1.8.0
        jinzhu/gorm v1.9.16
        joho/godotenv v1.3.0
        rs/cors v1.7.0
        golang.org/x/crypto v0.0.0-20201221181555-eec23a3978ad


