import { useRef, useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ChatPopup() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hello, how can I help you?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
    }
  }, [messages]);
  
  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();
  
    setError(null);
  
    if (!query) {
      alert('Please input a question');
      return;
    }
  
    const question = query.trim();
  
    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));
  
    setLoading(true);
    setQuery('');
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();
      console.log('data', data);
  
      if (data.error) {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: `${data.error}`,
            },
          ],
        }));
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }
      console.log('messageState', messageState);
  
      setLoading(false);
  
      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'apiMessage',
            message: 'An error occurred while fetching the data. Please try again.',
          },
        ],
      }));
      console.log('error', error);
    }
  }
  

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-4 max-w-md h-full overflow-y-auto p-2">
        <h1 className="text-xl font-bold leading-[1.1] tracking-tighter text-center">
          Chat With Your Legal Docs
        </h1>
        <main className="flex flex-col gap-4">
        <div
  ref={messageListRef}
  className="bg-blue-100 p-2 rounded-lg overflow-y-auto h-96"
>
  {messages.map((message, index) => {
    let icon;
    let className;
    if (message.type === 'apiMessage') {
      icon = (
        <Image
          key={index}
          src="/bot-image.png"
          alt="AI"
          width="40"
          height="40"
          className="mr-2"
          priority
        />
      );
      className = "flex items-start mb-4";
    } else {
      icon = (
        <Image
          key={index}
          src="/usericon.png"
          alt="Me"
          width="30"
          height="30"
          className="ml-2"
          priority
        />
      );
      className = "flex items-center mb-4 justify-end";
    }
    return (
      <>
        <div key={`chatMessage-${index}`} className={className}>
          {message.type === 'apiMessage' && icon}
          <div className="bg-white p-3 rounded-lg">
            <ReactMarkdown linkTarget="_blank">
              {message.message}
            </ReactMarkdown>
          </div>
          {message.type === 'userMessage' && icon}
        </div>
                  {message.sourceDocs && (
                    <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                      <Accordion
                        type="single"
                        collapsible
                        className="flex-col"
                      >
                        {message.sourceDocs.map((doc, index) => (
                          <div key={`messageSourceDocs-${index}`}>
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger>
                                <h3>Source {index + 1}</h3>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ReactMarkdown linkTarget="_blank">
                                  {doc.pageContent}
                                </ReactMarkdown>
                                <p className="mt-2">
                                  <b>Source:</b> {doc.metadata.source}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="flex">
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? 'Waiting for response...' : 'What is this legal case about?'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded-md disabled:bg-blue-300 disabled:text-gray-400"
              >
                {loading ? (
                  <LoadingDots color="#FFF" />
                ) : (
                    <svg
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}