import { Fragment, useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import "./Main.css";

const Main = () => {
  const {
    input,
    setInput,
    recentPrompt,
    response,
    loading,
    showResult,
    onSend,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <div>Gemini</div>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-top">
              <p>{recentPrompt}</p>
            </div>
            <div className="result-bottom">
              {loading ? (
                <div className="loading"><hr/></div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: response }}></div>
              )}
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="greet">
              <div>
                <span>Hello, Dev.</span>
              </div>
              <div>How I can help you today?</div>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work retreat</p>
                <img src={assets.message} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code} alt="" />
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a propmt here"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div>
            <img src={assets.gallery} alt="" />
            <img src={assets.mike} alt="" />
            {input && <img onClick={() => onSend()} src={assets.send} alt="" />}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display innacurate information. including about people, so
          double-check its response. your privacy and Gemini Apss.
        </p>
      </div>
    </div>
  );
};

export default Main;
