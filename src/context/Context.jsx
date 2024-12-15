import PropTypes from "prop-types";
import run from "../config/gemini";
import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);

  const deleyPara = async (index, nextWord) => {
    await setTimeout(() => {
      setResponse((prev) => prev + nextWord);
    }, index * 75);
  };
  const new_chat = () => {
    setShowResult(false);
    setRecentPrompt("");
    setResponse("");
    setInput("");
  };

  const onSend = async (prompt) => {
    setRecentPrompt("");
    setLoading(true);
    setShowResult(true);
    setResponse("");
    let data;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      data = await run(prompt);
    } else {
      setRecentPrompt(input);
      data = await run(input);
      setPrevPrompts((prev) => [...prev, input]);
    }
    let filterResponse = data.split("**");
    let newArray = "";
    for (let i = 0; i < filterResponse.length; i++) {
      if (i === 0 || i % 2 != 1) {
        newArray += filterResponse[i];
      } else {
        newArray += "<b>" + filterResponse[i] + "</b>";
      }
    }
    let newRes2 = newArray.split("*").join("</br>");

    let newResponfeArray = newRes2.split(" ");
    for (let i = 0; i < newResponfeArray.length; i++) {
      const nextWord = newResponfeArray[i];
      await deleyPara(i, nextWord + " ");
    }
    setInput("");

    setLoading(false);
  };
  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    response,
    loading,
    showResult,
    prevPrompts,
    setPrevPrompts,
    onSend,
    new_chat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
