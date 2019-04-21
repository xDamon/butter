import { Client } from "@discord-yuh/standard";
import { Config } from "@Definition/Config";
import { ButterClientSettings } from "@Client/ButterClientSettings";

export class ButterClient extends Client {
	public readonly config: Config;

	public constructor(settings: ButterClientSettings) {
		super(settings);

		this.config = settings.config;
	}
}
