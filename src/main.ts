import { join } from "path";
import { User } from "discord.js";
import { Config } from "@Definition/Config";
import { ButterClientSettings } from "@Client/ButterClientSettings";
import { ButterClient } from "@Client/ButterClient";
import {
	CommandLoader,
	MiddlewareRegistry,
	PingCommand,
	HelpCommand,
	EvalCommand,
} from "@discord-yuh/standard";

const commandsDir: string = join(__dirname, "commands");

let config: Config;

try {
	config = require("../config.json");
} catch {
	config = {
		production: true,
		discord: {
			token: process.env.DISCORD_TOKEN,
			owners: process.env.DISCORD_OWNERS.split(","),
			prefix: process.env.DISCORD_PREFIX
		},
		google: {
			key: process.env.GOOGLE_KEY,
			cx: process.env.GOOGLE_CX
		}
	};
}

const loader: CommandLoader = new CommandLoader();
const middleware: MiddlewareRegistry = new MiddlewareRegistry();

const client: ButterClient = new ButterClient({
	prefix: config.discord.prefix,
	production: config.production,
	owners: config.discord.owners,
	commands: loader.registry,
	middleware: middleware,
	config: config
});

client.commands
	.register(new PingCommand())
	.register(new HelpCommand())
	.register(new EvalCommand());

client.once("ready", () => {
	console.log("Ready");
});

client.on("error", err => {
	console.error(err);
});

loader.loadDir(commandsDir)
	.then(() => client.login(config.discord.token))
	.then(() => {
		process.on("unhandledRejection", console.error);
	})
	.catch(err => {
		console.error(`Startup error: ${err}`);
	});
