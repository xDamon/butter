import fetch from "node-fetch";
import { stringify } from "querystring";
import { ButterClient } from "../lib/client/ButterClient";
import { Message } from "discord.js";
import {
	Command,
	middleware,
	args,
	userPermissions,
	clientPermissions,
	r
} from "@discord-yuh/standard";

export class PurgeCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = ["del"];
		this.description = "Bulk deletes messages";
		this.usage = "[prefix][name] [amount]";
	}

	@middleware(args(r.integer))
	@middleware(userPermissions("MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"))
	@middleware(clientPermissions("MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"))
	public async execute(message: Message, [amount]: [number]): Promise<any> {
		if (amount <= 0) {
			await message.channel.send("The amount must be more than zero.");
		} else {
			try {
				await message.channel.bulkDelete(amount + 1);
			} catch {
				await message.channel.send("Unable to bulk delete messages.");
			}
		}
	}
}
