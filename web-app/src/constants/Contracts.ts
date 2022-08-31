export const CONTRACTS = {
	notes: "Notes",
};

export const CONTRACT_FUNCTIONS = {
	[CONTRACTS.notes]: {
		tx: {
			create: "createNote",
		},
		simple: {
			totalSupply: "totalSupply",
			tokensByOwner: "notesByOwner",
			ownerOf: "ownerOf",
			balanceOf: "balanceOf",
		},
	},
};
