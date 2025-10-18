import { execute } from "@sourcegraph/amp-sdk";

async function getResult(prompt: string): Promise<string> {
    for await (const message of execute({
        prompt,
        options: { dangerouslyAllowAll: true },
    })) {
        if (message.type === "result") {
            if (message.is_error) {
                throw new Error(message.error);
            }
            return message.result;
        }
    }
    throw new Error("No result received");
}

// Usage
(async () => {
    try {
        const result = await getResult(
            "List all TypeScript files in this project",
        );
        console.log("Found files:", result);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed:", error.message);
        } else {
            console.error("Failed:", error);
        }
    }
})();
