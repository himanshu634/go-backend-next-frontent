package db

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

func ConnectToMongo() (*mongo.Client, error) {
	opts := options.Client().ApplyURI("mongodb+srv://demo:EFEkemztYNxqJ9zF@renie-demo.g4mpyuj.mongodb.net/?retryWrites=true&w=majority&appName=renie-demo")
	client, err := mongo.Connect(context.TODO(), opts)
	MongoClient = client

	if err!=nil {
		panic(err)
	}

	fmt.Printf("Connected to mongo %v", *client)

	return client, err
}