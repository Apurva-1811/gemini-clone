import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [theme, setTheme] = useState("light");
     const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
const onSent = async (prompt) => {
    try {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const usedPrompt = prompt !== undefined ? prompt : input;

        // Only add to history if not already present or if it's a fresh input
        if (!previousPrompt.includes(usedPrompt) && usedPrompt.trim() !== "") {
            setPreviousPrompt(prev => [...prev, usedPrompt]);
        }

        setRecentPrompt(usedPrompt);

        const fullResponse = await main(usedPrompt);

        let responseArray = fullResponse.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setInput("");
    } catch (error) {
        console.error("Error in onSent:", error);
        setResultData("❌ Failed to fetch response. Please try again.");
    } finally {
        setLoading(false);
    }
};


    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        theme, toggleTheme // ✅ Export theme
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
