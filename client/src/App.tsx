import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppContext } from "./context";

import Messages from "./pages/Posts";

function App() {
  const [postValue, setPostValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [postId, setPostId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [take, setTake] = useState(4);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

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
        searchValue,
        setSearchValue,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        take,
        setTake,
        skip,
        setSkip,
        page,
        setPage,
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
