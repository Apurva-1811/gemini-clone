import React, { useContext, useState } from 'react'
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import { speakText } from '../../utility/textToSpeech';
import { startListening } from '../../utility/speechToText';



const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        theme,
        toggleTheme
    } = useContext(Context);
    const [listening, setListening] = useState(false);


    return (
        <div className={`main ${theme}`}>
            <div className="nav">
                <p>Gemini</p>
                <div className="nav-right">
                    {/* 🌗 Theme toggle switch */}
                    <label className="switch">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
                        <span className="slider round"></span>
                    </label>
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Apurva</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='' />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt='' />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (<>
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                <button className="speak-btn" onClick={() => speakText(resultData)}>🔊 Speak</button>
                            </>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type='text'
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            {listening && (
                                <div className="listening-indicator">
                                    <img src={assets.mic_icon} alt="listening" className="pulse" />
                                    <p>Listening...</p>
                                </div>
                            )}

                            <img
                                src={assets.mic_icon}
                                alt="mic"
                                onClick={() => {
                                    setListening(true); // ✅ show feedback
                                    startListening(
                                        (spokenText) => {
                                            setInput(spokenText);
                                            setListening(false); // ✅ hide after speech ends
                                        },
                                        () => setListening(false)
                                    );
                                }}
                            />


                            {input && (
                                <img
                                    onClick={() => onSent(input)}
                                    src={assets.send_icon}
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
