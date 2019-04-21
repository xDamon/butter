export type Config = {
	production: boolean;
	discord: {
		token: string;
		owners: string[];
		prefix: string;
	},
	google: {
		key: string;
		cx: string;
	}
};
