import fetch from "node-fetch";
import { stringify } from "querystring";
import { ButterClient } from "../lib/client/ButterClient";
import { Message } from "discord.js";
import {
	Command,
	middleware,
	args,
	clientPermissions,
	r
} from "@discord-yuh/standard";

export class ImageCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = ["i", "🔎", "🔍", "👀"];
		this.description = "Display's an image from Google Images.";
		this.usage = "[prefix][name] [...query]";
	}

	@middleware(args(r.string))
	@middleware(clientPermissions("SEND_MESSAGES"))
	public async execute(message: Message, [query]: [string]): Promise<any> {
		const client: ButterClient = message.client as ButterClient;
		const status: Message = await message.channel.send("Searching...") as Message;
		const base: string = "https://www.googleapis.com/customsearch/v1?";
		const queryString: string = stringify({
			key: client.config.google.key,
			cx: client.config.google.cx,
			searchType: "image",
			q: query
		});

		let res: any;

		try {
			res = await fetch(`${base}${queryString}`);
			res = await res.json();
		} catch {
			res = {};
		}

		const items: any[] = res.items;
		const link: string = items ? items[0].link : "";

		if (link) {
			await status.edit(`Image found: ${link}`);
		} else {
			await status.edit("Couldn't find anything...");
		}
	}
}
