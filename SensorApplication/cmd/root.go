package cmd

import (
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func Run() {
	app := &cli.App{
		Action: handler,
		Flags:  getFlags(),
	}
	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func handler(c *cli.Context) error {
	command := c.Args().Get(0)
	if command == "publish" {
		return PublishHandler(c)
	} else if command == "subscribe" {
		return SubscribeHandler(c)
	}
	return nil
}

func getFlags() []cli.Flag {
	return []cli.Flag{
		&cli.StringFlag{
			Name:  "topic",
			Usage: "The topic to publish to",
		},
		&cli.StringFlag{
			Name:  "broker",
			Usage: "The MQTT broker to connect to",
		},
		&cli.Uint64Flag{
			Name:  "rate",
			Usage: "The rate (Msg/s) at which to publish messages",
		},
	}
}
