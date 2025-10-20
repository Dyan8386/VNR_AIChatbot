
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from "@google/genai";
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessageComponent from './components/ChatMessage';
import { createChatSession } from './services/geminiService';
import { MessageRole, ChatMessage } from './types';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const chatSession = createChatSession();
      setChat(chatSession);
       setMessages([{
        role: MessageRole.MODEL,
        content: "Xin chào! Tôi là trợ lý AI chuyên về Lịch sử Đảng Cộng sản Việt Nam. Bạn muốn hỏi về vấn đề gì?"
      }]);
    } catch (e) {
      setError("Failed to initialize AI session. Please check your API key.");
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!chat) return;

    setIsLoading(true);
    setError(null);
    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: MessageRole.USER, content: userMessage },
    ];
    setMessages(updatedMessages);

    try {
        const stream = await chat.sendMessageStream({ message: userMessage });

        let modelResponse = '';
        setMessages(prev => [...prev, { role: MessageRole.MODEL, content: '...' }]);

        for await (const chunk of stream) {
            modelResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: MessageRole.MODEL, content: modelResponse };
                return newMessages;
            });
        }
    } catch (e) {
      console.error(e);
      setError('An error occurred while fetching the response. Please try again.');
      setMessages(prev => [...prev.slice(0,-1)]); // Remove user message if error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-dark-primary text-text-primary">
      <Header />
      <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} message={msg} />
          ))}
          {error && (
             <div className="flex justify-start my-4">
                <div className="max-w-xl lg:max-w-3xl p-4 rounded-xl shadow-md bg-red-800/50 text-red-200 border border-red-500">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
             </div>
          )}
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
