import { McpServer, ResourceTemplate } from "@mcp/sdk/server/mcp.js";
import type { Variables } from "@mcp/sdk/shared/uriTemplate.js";
import { z } from "zod";

const server = new McpServer({
	name: "Demo",
	version: "1.0.0",
});

// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
	content: [{ type: "text", text: String(a + b) }],
}));

// Add a dynamic greeting resource
server.resource(
	"greeting",
	new ResourceTemplate("greeting://{name}", { list: undefined }),
	async (uri: URL, { name }: Variables) => ({
		contents: [
			{
				uri: uri.href,
				text: `Hello, ${name}!`,
			},
		],
	}),
);

// Add a prompt
server.prompt("review-code", { code: z.string() }, ({ code }) => ({
	messages: [
		{
			role: "user",
			content: {
				type: "text",
				text: `Please review this code:\n\n${code}`,
			},
		},
	],
}));

export default server;
