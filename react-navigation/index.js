import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Main } from "next/document";
import { useState } from "react";

configureAbly({
  key: "oHONOg.n86Pyg:qVYljC8cf6kY95olMgGlNTX5az_h6qkSnaPtX69i01g",
  clientId: Date.now() + "",
});

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
  }

  return (
    <main>
      {messages.map((message) => (
        <div className="chat chat-start">
          <div className="chat-bubble">{message.data.text}</div>
        </div>
      ))}
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-neutral" onClick={sendMessage}>
        sendMessage
      </button>
    </main>
  );
}
