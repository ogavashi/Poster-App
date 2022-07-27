import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppContext } from "./context";

import Messages from "./pages/Posts";

function App() {
  const [postValue, setPostValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [postId, setPostId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        postValue,
        setPostValue,
        isVisible,
        setIsVisible,
        replyValue,
        setReplyValue,
        postId,
        setPostId,
      }}
    >
      <div className="wrapper">
        <Header />
        <Messages />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
