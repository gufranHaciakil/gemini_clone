import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./sidebar.css";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { onSend, prevPrompts, setRecentPrompt, new_chat } = useContext(
    Context
  );
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };
  return (
    <div
      className="sidebar"
      style={{ alignItems: showSidebar ? "start" : "center" }}
    >
      <div className="top">
        <img
          className="menu"
          src={assets.menu}
          alt="menu"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div
          onClick={new_chat}
          className="new-chat"
          style={{ padding: showSidebar ? "0 7px" : "7px" }}
        >
          <img src={assets.plus} alt="" />
          {showSidebar ? <p>New chat</p> : null}
        </div>
        {showSidebar ? (
          <div className="recent">
            <div className="recent-title">Recent</div>
            <div
              className="recent-entry"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {prevPrompts.map((item, index) => {
                return (
                  <div
                    onClick={() => loadPrompt(item)}
                    className="recent-item"
                    key={index}
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img src={assets.chat} alt="recent" />
                    <p>{item} </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="bottom"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: showSidebar ? "start" : "center",
        }}
      >
        <div
          className="bottom-item recent-entry"
          style={{ justifyContent: showSidebar ? "start" : "center" }}
        >
          <img src={assets.help} alt="" width={""} />
          {showSidebar ? <p>Help</p> : null}
        </div>
        <div
          className="bottom-item recent-entry"
          style={{ justifyContent: showSidebar ? "start" : "center" }}
        >
          <img src={assets.history} alt="" />
          {showSidebar ? <p>History</p> : null}
        </div>
        <div
          className="bottom-item recent-entry"
          style={{ justifyContent: showSidebar ? "start" : "center" }}
        >
          <img src={assets.setting} alt="" />
          {showSidebar ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
