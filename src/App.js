import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [browserInfo, setBrowserInfo] = useState("");

  useEffect(() => {
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browserDetails = "Browser not detected";

      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        // Extract Safari version
        const safariVersionMatch = userAgent.match(/Version\/(\d+\.\d+)/);
        const safariVersion = safariVersionMatch
          ? safariVersionMatch[1]
          : "Unknown version";
        browserDetails = `Safari version: ${safariVersion}`;
      } else if (userAgent.includes("Chrome")) {
        browserDetails = "You're using Chrome, not Safari.";
      } else {
        browserDetails = "This is not a Safari browser.";
      }

      setBrowserInfo(browserDetails);
    };

    getBrowserInfo();
  }, []);
  return (
    <div className="App">
      hello world
      <h1>Safari Version Check</h1>
      <p>{browserInfo}</p>
    </div>
  );
}

export default App;
