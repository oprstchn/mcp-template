# MCP Template

A template project for building [Model Control Protocol (MCP)](https://github.com/anthropics/model-control-protocol) servers with Deno.

## Features

- Simple MCP server setup with example tools, resources, and prompts
- Support for both stdio and SSE transport modes
- Ready to use with Claude or other MCP compatible AI models

## Requirements

- [Deno](https://deno.com/) 1.x or later

## Getting Started

1. Clone this repository
2. Run the server in your preferred mode:

```bash
# Run in stdio mode (for direct integration with MCP clients)
deno run --allow-net --allow-read --allow-write --allow-run main.ts --mode=stdio

# Run in SSE mode (for web-based clients)
deno run --allow-net --allow-read --allow-write --allow-run main.ts --mode=sse --port=8888
```

## Configuration

- `--mode=stdio|sse`: Select the transport mode (required)
- `--port=NUMBER`: Specify the port for SSE mode (default: 8888, ignored in stdio mode)

## Project Structure

- `main.ts`: Entry point that handles command-line arguments and starts the server
- `server/`
  - `mcp.ts`: MCP server definition with example tools, resources, and prompts
  - `sse.ts`: Implementation of the SSE transport
  - `stdio.ts`: Implementation of the stdio transport

## Example Features

The template includes several example features:

1. **Addition Tool**: A simple tool that adds two numbers
   ```javascript
   server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
     content: [{ type: "text", text: String(a + b) }],
   }));
   ```

2. **Greeting Resource**: A dynamic resource that generates greetings
   ```javascript
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
   ```

3. **Code Review Prompt**: A prompt template for code reviews
   ```javascript
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
   ```

## License

See the [LICENSE](LICENSE) file for license information.