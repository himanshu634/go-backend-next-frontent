package handlers

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/renie-assignment/src/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type RewardObject struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	CreatedAt        time.Time          `json:"created_at" bson:"created_at"`
	Title            string             `json:"title" bson:"title"`
	Subtitle         string             `json:"subtitle" bson:"subtitle"`
	Price            float64            `json:"price" bson:"price"`
	ShortDescription string             `json:"short_description" bson:"short_description"`
	LongDescription  string             `json:"long_description" bson:"long_description"`
	Image            string             `json:"image" bson:"image"`
	RedeemSteps      []string           `json:"redeem_steps" bson:"redeem_steps"`
}

func RewardListHandler(c *fiber.Ctx) error {
	sortBy := c.Query("sortBy")
	collection := db.MongoClient.Database("demo").Collection("rewards")
	var rewardsList []RewardObject

	if sortBy != "" {
		ascendingParam := c.Query("ascending")
		var ascending int = 1

		if ascendingParam == "true" {
			ascending = 1
		}

		if ascendingParam == "false" {
			ascending = -1
		}
		sortedRewardsListCursor, err := collection.Find(context.Background(), bson.D{}, options.Find().SetSort(bson.D{{Key: sortBy, Value: ascending}}))
		if err != nil {
			fmt.Printf("Error is %v and %v", err, ascending)
			return c.Status(fiber.StatusInternalServerError).SendString("Something went wrong!")
		}
		defer sortedRewardsListCursor.Close(context.Background())

		for sortedRewardsListCursor.Next(context.Background()) {
			var doc RewardObject
			if err := sortedRewardsListCursor.Decode(&doc); err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Error while decoding sorted cursor!")
			}
			rewardsList = append(rewardsList, doc)
		}

		return c.JSON(rewardsList)
	}

	rewardsListCursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error in Fetching documents")
	}
	defer rewardsListCursor.Close(context.Background())
	for rewardsListCursor.Next(context.Background()) {
		var doc RewardObject
		if err := rewardsListCursor.Decode(&doc); err != nil {
			fmt.Printf("Error happened: %v", err)
			return c.Status(fiber.StatusInternalServerError).SendString("Error while decoding documents.")
		}
		rewardsList = append(rewardsList, doc)
	}

	return c.JSON(rewardsList)
}
