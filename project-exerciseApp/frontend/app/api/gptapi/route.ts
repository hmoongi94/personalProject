import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.openAiKey;
const organizationId = process.env.orgId;

const openai = new OpenAI({
  apiKey : apiKey,
  organization: organizationId,
  dangerouslyAllowBrowser: true,
});

export async function POST(req:NextRequest) {
      const formData = await req.formData()
      const question = formData.get('question')

      const userQuestion = question ? String(question) : '';

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userQuestion }],
        stream: true,
        temperature : 1.0,
        max_tokens : 1000,
      });

      let result = '';
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }
      console.log(result)

      return NextResponse.json({result}, {status:200})
  }