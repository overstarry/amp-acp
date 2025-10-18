import { execute } from "@sourcegraph/amp-sdk";

for await (const message of execute({
    prompt: "What files are in this directory?",
})) {
    if (message.type === "result" && !message.is_error) {
        console.log("Result:", message.result);
        break;
    }
}
