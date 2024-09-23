import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useWeavy, WyChat, Weavy } from "@weavy/uikit-react";

function App() {
  const [browserInfo, setBrowserInfo] = useState("");
  const [isChatAllowed, setIsChatAllowed] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browserDetails = "Browser not detected";
      let allowChat = false;

      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        // Extract Safari version
        const safariVersionMatch = userAgent.match(/Version\/(\d+\.\d+)/);
        const safariVersion = safariVersionMatch
          ? parseFloat(safariVersionMatch[1])
          : 0;

        if (safariVersion >= 17) {
          browserDetails = `Safari version: ${safariVersion}`;
          allowChat = true;
        } else {
          browserDetails = `Safari version: ${safariVersion} (Chat not allowed for versions below 17)`;
          allowChat = false;
        }
      } else if (userAgent.includes("Chrome")) {
        browserDetails = "You're using Chrome, chat is allowed.";
        allowChat = true;
      } else {
        browserDetails = "You're using another browser, chat is allowed.";
        allowChat = true;
      }

      setBrowserInfo(browserDetails);
      setIsChatAllowed(allowChat);
    };

    getBrowserInfo();
  }, []);
  useEffect(() => {
    fetch("https://odds-api.pcstaging.in/api/v1/weavy", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Content type
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk2YmExMzg2YWYyM2I3OWNlMmFiYiIsImVtYWlsIjoic2luZHVqYW02MkBnbWFpbC5jb20iLCJyb2xlIjoiZG9jdG9yIiwiaWF0IjoxNzI3MDY1MDA0LCJleHAiOjE3MjcxNTE0MDR9.bAwL5q-vdxxd96BIzVgnCZ8IPC-L4YllSCMFEhYlJgI", // Optional, for authentication if needed
      },
      body: JSON.stringify({
        userId: "66e96c71386af23b79ce2ac8",
        username: "Dr.sinduja",
      }),
    })
      .then((response) => response.json())
      .then((data) => setToken(data?.token))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const weavy = new Weavy();
        weavy.url = "https://cdf554a8863a44be9d9832d916c94e2e.weavy.io";
        weavy.tokenFactory = async () => token;

        // Clean up Weavy instance on unmount
        return () => {
          console.log("Cleaning up Weavy instance");
          weavy.destroy();
        };
      } catch (err) {
        console.error("Error initializing chat:", err);
      }
    };

    initializeChat();
  }, [token]);
  return (
    <div className="App">
      hello world
      <h1>Safari Version Check</h1>
      <div>
        <p>{browserInfo}</p>
        {isChatAllowed ? (
          <div>
            <h2>Chat allowed</h2>
            {/* Chat UI goes here */}
            <WyChat
              uid={"uid"}
              className="h-dvh max-h-dvh pt-16 overscroll-contain lg:h-[96dvh]"
              name={"chat"}
              autoCapitalize="true"
              autoFocus="true"
            ></WyChat>
          </div>
        ) : (
          // <p>Chat is not allowed for this version of Safari.</p>
          <WyChat
            uid={"uid"}
            className="h-dvh max-h-dvh pt-16 overscroll-contain lg:h-[96dvh]"
            name={"chat"}
            autoCapitalize="true"
            autoFocus="true"
          ></WyChat>
        )}
      </div>
    </div>
  );
}

export default App;
