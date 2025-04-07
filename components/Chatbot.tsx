"use client"

import { useState } from "react"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    const result = streamText({
      model: openai("gpt-4o"),
      prompt: `You are a helpful assistant for a canteen website. Answer the following question: ${input}`,
      onChunk: ({ chunk }) => {
        if (chunk.type === "text-delta") {
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1]
            if (lastMessage.role === "assistant") {
              return [...prevMessages.slice(0, -1), { ...lastMessage, content: lastMessage.content + chunk.text }]
            } else {
              return [...prevMessages, { role: "assistant", content: chunk.text }]
            }
          })
        }
      },
    })

    await result.text
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="w-full border rounded px-2 py-1"
        />
      </form>
    </div>
  )
}

