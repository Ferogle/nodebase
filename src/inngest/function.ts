import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import {createOpenAI} from "@ai-sdk/openai";
import {createAnthropic} from "@ai-sdk/anthropic";


const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeAI = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const {steps: geminiSteps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText, 
      {
        model: google('gemini-2.5-flash'),
        system: "You are a helpful assistant.",
        prompt: "What is your context? How are you getting invoked? Do you have any idea?"   
      }
    );

    const {steps: openAISteps} = await step.ai.wrap(
      "openai-generate-text",
      generateText, 
      {
        model: openai('gpt-5'),
        system: "You are a helpful assistant.",
        prompt: "What is your context? How are you getting invoked? Do you have any idea?"   
      }
    );

    const {steps: anthropicSteps} = await step.ai.wrap(
      "anthropic-generate-text",
      generateText, 
      {
        model: anthropic('claude-sonnet-4-5'),
        system: "You are a helpful assistant.",
        prompt: "What is your context? How are you getting invoked? Do you have any idea?"   
      }
    );

    return {
      geminiSteps,
      anthropicSteps,
      openAISteps
    };
  },
);