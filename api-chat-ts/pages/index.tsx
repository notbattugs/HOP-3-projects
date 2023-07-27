import { configureAbly, useChannel } from '@ably-labs/react-hooks';
import { Main } from 'next/document';
import { useState, useEffect } from 'react';
import { Types } from 'ably';
import { Textarea } from '@nextui-org/react';
import Link from 'next/link';
import axios from 'axios';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useUser,
  RedirectToSignIn,
} from '@clerk/nextjs';
import { AppProps } from 'next/app';
configureAbly({
  key: 'oHONOg.n86Pyg:qVYljC8cf6kY95olMgGlNTX5az_h6qkSnaPtX69i01g',
  clientId: Date.now() + '',
});
import Example from './example';

export default function Home({ Component, pageProps }: AppProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState('');
  const [pfp, setPfp] = useState('');

  const [messages, setMessages] = useState<(string | Types.Message)[]>([]);
  const [channel] = useChannel('message', (message) => {
    setMessages((prev: (string | Types.Message)[]) => [
      ...prev,
      { text: message.data.text, id: message.data.date },
    ]);
  });

  async function sendMessage() {
    channel.publish('message', { text, date: Date.now(), pfp });
    setText('');
    setPfp('');
  }

  const AddPost = () => {
    channel.publish('message', {
      text,
      date: Date.now(),
      pfp,
    });
    setText('');
    if (text) {
      axios
        .post('http://localhost:3000/api/messages', {
          text: text,
          pfp: user?.imageUrl,
        })
        .then((res) => {
          getMessages();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const DeletePost = (id: string) => {
    console.log('id', id);
    axios
      .delete('http://localhost:3000/api/messages/' + id)
      .then((res) => {
        getMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getMessages() {
    axios
      .get('http://localhost:3000/api/messages')
      .then((res) => {
        setMessages(res.data.documents);
        console.log(res.data.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <SignedIn>
        <div>
          <p>Hello,{user?.fullName}</p>
          <div
            style={{
              width: '20%',
              height: '300px',
              overflow: 'scroll',
              backgroundColor: '#fff',
            }}
          >
            {messages.map((message, i) => (
              <div>
                <div key={i} style={{ display: 'flex' }}>
                  <img
                    src={message.pd   fp}
                    style={{ width: '50px', height: '50px', borderRadius: 50 }}
                  ></img>
                  <div>{message.Text}</div>
                  <button
                    onClick={() => DeletePost(message._id)}
                    style={{ width: '30px', height: '30px' }}
                  >
                    🗑
                  </button>
                  {/* <button
                    className="ui-btn"
                    onClick={() => DeletePost(message._id)}
                  >
                    <span>Edit</span>
                  </button> */}
                </div>
                <hr />
              </div>
            ))}
          </div>
          <Textarea
            placeholder="Aa"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => AddPost()}>sendMessage</button>
        </div>
        <Example />
      </SignedIn>
      <SignedOut>
        <div>
          <Link href="/sign-up">
            <button className="ui-btn">
              <span>Sign Up</span>
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="ui-btn">
              <span>Sign In</span>
            </button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
