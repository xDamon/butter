import { ClientSettings } from "@discord-yuh/standard";
import { Config } from "@Definition/Config";

export type ButterClientSettings = ClientSettings & {
	config: Config;
};
