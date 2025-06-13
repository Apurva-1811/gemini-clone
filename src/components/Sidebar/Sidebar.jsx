import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);

    const { onSent, previousPrompt, setRecentPrompt, newChat, theme } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`sidebar ${theme}`}>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt='' />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousPrompt.map((item, index) => (
                            <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt='' />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
