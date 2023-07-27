import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Main } from "next/document";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";
import axios from "axios";
configureAbly({
  key: "oHONOg.n86Pyg:qVYljC8cf6kY95olMgGlNTX5az_h6qkSnaPtX69i01g",
  clientId: Date.now() + "",
});
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
  "pk_test_c2FjcmVkLWJlZS0yMi5jbGVyay5hY2NvdW50cy5kZXYk";
const CLERK_SECRET_KEY = "sk_test_GuFGeZZasEDSov3kJ4vHOM2FG6McupcdhmVKZmFOVX";
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

  const [data, setData] = useState([]);
  const getMessage = async () => {
    const res = await axios.get("http://192.168.1.60:3000/api/get-message");
    setData(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getMessage();
  }, []);
  console.log(data);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="mockup-phone border-success">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <div style={{ width: "100%", height: "400px", overflow: "scroll" }}>
              {messages.map((message) => (
                <div className="chat chat-start">
                  <div className="chat-bubble">{message.data.text}</div>
                </div>
              ))}
              {data.map((data) => (
                <div className="chat chat-start">
                  <div className="chat-bubble">{data.documents}</div>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Aa"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn btn-neutral" onClick={sendMessage}>
              sendMessage
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
