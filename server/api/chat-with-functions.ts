import { OpenAIStream, StreamingTextResponse, StreamData } from "ai";
import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";

const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: "get_current_weather",
    description: "Get the current weather.",
    parameters: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "The temperature unit to use.",
        },
      },
      required: ["format"],
    },
  },
  {
    name: "eval_code_in_browser",
    description: "Execute javascript code in the browser with eval().",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: `Javascript code that will be directly executed via eval(). Do not use backticks in your response.
           DO NOT include any newlines in your response, and be sure to provide only valid JSON when providing the arguments object.
           The output of the eval() will be returned directly by the function.`,
        },
      },
      required: ["code"],
    },
  },
];

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) throw new Error("Missing OpenAI API key");
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages,
      functions,
    });

    const data = new StreamData();
    const stream = OpenAIStream(response, {
      experimental_onFunctionCall: async (
        { name, arguments: args },
        createFunctionCallMessages
      ) => {
        if (name === "get_current_weather") {
          // Call a weather API here
          const weatherData = {
            temperature: 20,
            unit: args.format === "celsius" ? "C" : "F",
          };

          data.append({
            text: "Some custom data",
          });

          const newMessages = createFunctionCallMessages(weatherData);
          return openai.chat.completions.create({
            messages: [...messages, ...newMessages],
            stream: true,
            model: "gpt-4o-mini",
          });
        }
      },
      onCompletion(completion) {
        console.log("completion", completion);
      },
      onFinal(completion) {
        data.close();
      },
    });

    data.append({
      text: "Hello, how are you?",
    });

    return new StreamingTextResponse(stream, {}, data);
  });
});
