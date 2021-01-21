# Phonebook

App for phonebook contact management.

## App parts:
    - Front-end: Angular v11
    - Back-end: Go v1.15
    - Database: MySQL

## Features implemented:
    - Front-end
        Authentication (signup, login, logout, auto login, auto logout, route guard),
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
        ...
    - Back-end
        Routing (with gorilla/mux)
        CORS handling (with rs/cors)
        Database connection (ORM with gorm, auto migration)
        Authentication (via JWT, x/crypto)
        Environment configuration (via joho/dotenv)
        ...

## How it works
When new user navigates to web app's base route (http://localhost:4200) he is automatically
routed to auth page. Auth page has signup/login functionality

## How to run everything
Clone the repo
    cd /api

    go get

    


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


