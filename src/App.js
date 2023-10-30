import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import WistiaEmbed from "./Components/IframeEmbed";
import WistiaVideo from "./Components/WistiaEmbed";
import convertTime from "./Helpers/convertTime";
import { MdClose } from "react-icons/md";
// import wistia from "wistia";
const API_ROUTE = process.env.REACT_APP_API_ROUTES;
function App() {
  const [logsfile, setLogsFile] = useState([]);
  const [videoTime, setVideoTime] = useState("00:00");
  const [duration, setDuration] = useState("");
  const [slidesState, setSlidesState] = useState([]);
  const wistiaVideId = window.location.pathname;

  useEffect(() => {
    fetch(`${API_ROUTE}/logs`, {
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => response.json()) 
      .then((data) => {
        setLogsFile(data);
        const result = data[wistiaVideId.slice(1)] || [];
        setSlidesState(result);
      })
      .catch((error) => console.error("Error:", error));

  }, []);

  const videoPlayer = useRef(null);
  const addVideoTimeStampAndSlide = () => {
    const newArr = [...slidesState];
    newArr.push({ time: videoTime, Link: "" });
    setSlidesState(newArr);
  };
  const  removeVideoTimeStampAndSlide = (index) => {
    const newArr = [...slidesState].filter((item, i) => i !== index);
    // newArr.push({ time: videoTime, Link: "" });
    setSlidesState(newArr);
  };
  const fetchPostMethod = () => {
    let newLogsFile = { ...logsfile };
    // if (logsfile[wistiaVideId.slice(1)] == undefined) {
    newLogsFile[wistiaVideId.slice(1)] = slidesState;
    // }
    fetch(`${API_ROUTE}/WriteLogsFile`, {
      method: "post",
      body: JSON.stringify(newLogsFile),
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };
  window._wq = window._wq || [];
  window._wq.push({
    id: wistiaVideId,
    onFind: function (video) {
      video.addPlugin("myPluginName", {
        src: "https://wiggly-tree-nectarine.glitch.me/my-plugin.js",
      });
    },
    onHasData: () => {
      console.log("onHasData");
    },
    onReady: function (video) {
      setDuration(convertTime(video.duration()));

      // setTime(video.time());
    },
    onchange: function (video) {
      console.log(video.time());
    },

    onplay: () => {
      console.log("playing");
    },
    ontimeupdate: (video) => {
      console.log(video);
    },
  });
  const data = {
    preload: true,
    muted: true,
    playsinline: true,
    autoPlay: true,
    silentAutoPlay: true,
    endVideoBehavior: "loop",
  };
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <WistiaVideo
          setVideoTime={setVideoTime}
          logsFile={logsfile}
          wistiaId={wistiaVideId}
        />
        <div
          style={{
            height: "100%",
            width: "70%",
            backgroundColor: "rgb(47, 47, 47)",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              backgroundColor: "white",
              margin: "2% auto",
              padding: "20px",
              display: "grid",
              gridTemplateRows: " 100px calc(100% - 200px) 100px",
            }}
          >
            <div
              style={{
                width: "250px",
                height: "auto",
                marginRight: "10px",
                marginLeft: "auto",
                background: "rgb(47, 47, 47)",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <h2 className="DurationAndTime">Duration: {duration}</h2>
              <h2 className="DurationAndTime">Time: {videoTime}</h2>
            </div>
            <div
              style={{
                width: "90%",
                height: "70%",
                padding: "20px",
                margin: "auto",
              }}
              id="content"
            >
              {slidesState.map((item, i) => {
                return (
                  <div
                    style={{
                      width: "80%",
                      height: "auto",
                      background: "rgb(47, 47, 47)",
                      color: "white",
                      margin: "auto",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "25px",
                        position: "absolute",
                        right: "10%",
                        cursor: "pointer"
                      }}
                      onClick={()=> removeVideoTimeStampAndSlide(i)}
                    >
                      <MdClose/>
                    </div>
                    <h2 className="DurationAndTime">Time: {item.time}</h2>
                    <label>Document Link</label>
                    <input
                      style={{ width: "60%", height: "40px" }}
                      value={item.Link}
                      onChange={(e) => {
                        let newArr = [...slidesState];
                        newArr[i].Link = e.target.value;
                        setSlidesState(newArr);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              style={{
                width: "100%",
                height: "100px",
                // background: "gray",

                // position: "relative",
              }}
            >
              <button
                onClick={() => fetchPostMethod()}
               className="saveButton"
              >
                Save
              </button>
              <button
                onClick={() => addVideoTimeStampAndSlide()}
               className="addButton"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
