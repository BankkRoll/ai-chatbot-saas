import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;

  console.log('question', question);

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
      },
    );

    //create chain
    const chain = makeChain(vectorStore);
    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log('response', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);

    let errorMessage = error.message || 'Something went wrong';

    if (errorMessage === 'OpenAI API key not found') {
      errorMessage = "I'm sorry, I can't process your request right now because my API key is missing. Please contact the administrator for assistance.";
    } else if (errorMessage.includes('401')) {
      errorMessage = "It seems there's an issue with the authentication. Please contact the administrator for assistance.";
    } else if (errorMessage.includes('429')) {
      errorMessage = "I'm currently experiencing a high volume of requests or have reached my rate limit. Please try again later.";
    } else if (errorMessage.includes('500')) {
      errorMessage = "I'm sorry, there was an error processing your request. Please try again later and contact the administrator if the issue persists.";
    }

    res.status(500).json({ error: errorMessage });
  }
}
