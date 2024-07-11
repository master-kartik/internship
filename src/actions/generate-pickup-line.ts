'use server'

import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function generatePickupLine(crush: string, style: string): Promise<string> {
  try {
    const output1 = await replicate.run(
      "mistralai/mistral-7b-instruct-v0.2",
      {
        input: {
          prompt: `Generate a ${style} pickup line for someone with these characteristics: ${crush}. The pickup line should be creative and relevant to the given information.`
        }
      }
    )
    const output2 = await replicate.run(
      "mistralai/mistral-7b-instruct-v0.2",
      {
        input: {
          prompt: `Generate a unique ${style} pickup line for someone with these characteristics: ${crush}. The pickup line should be creative and relevant to the given information.`,
          temperature: 0.8,
        }
      }
    )
    console.log(output2)
    return (
      {
        output1: output1,
        output2: output2
      }

    );
  } catch (error) {
    console.error('Error generating pickup line:', error)
    throw new Error('Failed to generate pickup line')
  }
}