package cmd

import (
	"log"

	"github.com/urfave/cli/v2"
)

func PublishHandler(c *cli.Context) error {
	topic := c.String("topic")
	broker := c.String("broker")
	rate := c.Uint64("rate")
	log.Printf("Publishing to topic %s at rate %d Msg/s to broker %s ", topic, rate, broker)
	return nil
}
