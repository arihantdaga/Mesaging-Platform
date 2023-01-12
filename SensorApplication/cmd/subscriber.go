package cmd

import (
	"log"

	"github.com/urfave/cli/v2"
)

func SubscribeHandler(c *cli.Context) error {
	topic := c.String("topic")
	broker := c.String("broker")
	log.Printf("Subscribing to topic %s with broker %s ", topic, broker)
	return nil
}
