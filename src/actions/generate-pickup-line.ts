"use server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generatePickupLine(
  crush: string,
  style: string
): Promise<string> {
  try {
    const input = {
      prompt: `Generate a ${style} pickup line for someone with these characteristics: ${crush}. The pickup line should be creative and relevant to the given information.`,
    };
    let output1 = "";

    for await (const event of replicate.stream(
      "mistralai/mistral-7b-instruct-v0.2",
      { input }
    )) {
      output1 += event.toString();
    }
    const input2 = {
      prompt: `Generate a unique ${style} pickup line for someone with these characteristics and information given by me: ${crush}. The pickup line should be creative and relevant to the given information.`,
      temprature: 1,
    };
    let output2 = "";

    for await (const event of replicate.stream(
      "mistralai/mistral-7b-instruct-v0.2",
      { input: input2 }
    )) {
      output2 += event.toString();
    }

    console.log(output1);
    return {
      output1: output1,
      output2: output2,
    };
  } catch (error) {
    console.error("Error generating pickup line:", error);
    throw new Error("Failed to generate pickup line");
  }
}
