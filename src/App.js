import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [browserInfo, setBrowserInfo] = useState("");
  const [isChatAllowed, setIsChatAllowed] = useState(false);

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
          </div>
        ) : (
          <p>Chat is not allowed for this version of Safari.</p>
        )}
      </div>
    </div>
  );
}

export default App;
