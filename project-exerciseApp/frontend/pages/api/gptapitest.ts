import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.openAiKey;
const organizationId = process.env.orgId;

const openai = new OpenAI({
  apiKey: apiKey,
  organization: organizationId,
  dangerouslyAllowBrowser: true,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Missing question parameter' });
    }

    const userQuestion = question ? String(question) : '';

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userQuestion }],
      stream: true,
      temperature: 1.0,
      max_tokens: 1000,
    });

    let result = '';
    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || "";
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}