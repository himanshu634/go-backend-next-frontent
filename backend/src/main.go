package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/renie-assignment/src/db"
	"github.com/renie-assignment/src/handlers"
)

func main() {
	db.ConnectToMongo()	
	config := fiber.Config {
		CaseSensitive: true,
		EnablePrintRoutes: true,
		AppName: "renie-backend",
		ReduceMemoryUsage: true,
		ServerHeader: "Renie Backend",
	}

	app := fiber.New(config)

	app.Use(cors.New(cors.Config{AllowOrigins: "*"}))

	app.Get("/rewards/:sortBy?/:ascending?", handlers.RewardListHandler)
	app.Listen(":3002")
}



// mongo connection string.
// mongodb+srv://demo:EFEkemztYNxqJ9zF@renie-demo.g4mpyuj.mongodb.net/?retryWrites=true&w=majority&appName=renie-demo