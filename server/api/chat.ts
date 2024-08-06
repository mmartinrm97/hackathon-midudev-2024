import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export default defineLazyEventHandler(async () => {
  const openai = createOpenAI({
    apiKey: useRuntimeConfig().openaiApiKey,
  });

  return defineEventHandler(async (event: any) => {
    // Extract the `messages` from the body of the request
    const { messages } = await readBody(event);

    // Call the language model
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        ...convertToCoreMessages(messages),
        {
          role: "system",
          content:
            "Respond with a valid JSON object containing the workout plan. Do not include any explanatory text outside the JSON structure. Please provide your response with the following structure: { 'warmup': [{'name': 'exercise name', 'repetitions': 'number', 'sets': 'number'}], 'mainWorkout': [{'name': 'exercise name', 'repetitions': 'number', 'sets': 'number'}], 'cooldown': [{'name': 'exercise name', 'repetitions': 'number', 'sets': 'number'}] }",
        },
      ],
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // implement your own logic here, e.g. for storing messages
        // or recording token usage
      },
    });

    // Respond with the stream
    return result.toDataStreamResponse();
  });
});
