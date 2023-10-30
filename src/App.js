import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import WistiaVideo from "./Components/WistiaEmbed";
import convertTime from "./Helpers/convertTime";
import { MdClose } from "react-icons/md";
// import wistia from "wistia";
import database from "./configuration/config";
import { ref, set, getDatabase, child, get } from "firebase/database";
console.log(process.env.REACT_APP_API_ROUTES, 8);
const API_ROUTE = process.env.REACT_APP_API_ROUTES;
function App() {
  const [logsfile, setLogsFile] = useState([]);
  const [videoTime, setVideoTime] = useState("00:00");
  const [duration, setDuration] = useState("");
  const [slidesState, setSlidesState] = useState([]);
  // const [wistiaVideId, setWistiaVideoID] = useState("roc17q5zlb");
  const [input, setInput] = useState("");
  const wistiaVideId = window.location.href.split("?")[1];
  useEffect(() => {
    // fetch(`${API_ROUTE}/logs`, {
    //   headers: {
    //     "Content-Type": "application/json", // Set the content type to JSON
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLogsFile(data);
    //     const result = data[wistiaVideId] || [];
    //     setSlidesState(result);
    //   })
    //   .catch((error) => console.error("Error:", error));
    // window.location.href += wistiaVideId
    const dbRef = ref(getDatabase());
    get(child(dbRef, `OysterVideos`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLogsFile(snapshot.val())
          console.log(snapshot.val()[wistiaVideId], 100);
          setSlidesState(snapshot.val()[wistiaVideId])
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [wistiaVideId]);

  const videoPlayer = useRef(null);
  const addVideoTimeStampAndSlide = () => {
    const newArr = [...slidesState];
    newArr.push({ time: videoTime, Link: "" });
    setSlidesState(newArr);
  };
  const removeVideoTimeStampAndSlide = (index) => {
    const newArr = [...slidesState].filter((item, i) => i !== index);
    // newArr.push({ time: videoTime, Link: "" });
    setSlidesState(newArr);
  };
  const fetchPostMethod = () => {
    // const dbRef = database.ref('OysterVideos'); // Replace 'yourPath' with your desired path in the database
    const dbRef = ref(getDatabase());

    let newLogsFile = { ...logsfile };
    // if (logsfile[wistiaVideId.slice(1)] == undefined) {
    newLogsFile[wistiaVideId] = slidesState;
    // }
    set(ref(database, "OysterVideos"), newLogsFile)
    // fetch(`${API_ROUTE}/WriteLogsFile`, {
    //   method: "post",
    //   body: JSON.stringify(newLogsFile),
    //   headers: {
    //     "Content-Type": "application/json", // Set the content type to JSON
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error:", error));
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
            <div>
              {" "}
              <div
                style={{
                  width: "250px",
                  height: "80px",
                  marginRight: "auto",
                  marginLeft: "10px",
                  background: "rgb(47, 47, 47)",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  float: "left",
                }}
              >
                <h2 className="DurationAndTime">Wistia Video ID: </h2>
                <input onChange={(e) => setInput(e.target.value)} />
                <button
                  onClick={() => {
                    // setWistiaVideoID(input)
                    window.location.href += "usjbuuc8zy";
                    console.log(window.location.href);
                  }}
                >
                  Go
                </button>
              </div>
              <div
                style={{
                  width: "250px",
                  height: "80px",
                  marginRight: "10px",
                  marginLeft: "auto",
                  background: "rgb(47, 47, 47)",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  float: "right",
                }}
              >
                <h2 className="DurationAndTime">Duration: {duration}</h2>
                <h2 className="DurationAndTime">Time: {videoTime}</h2>
              </div>
            </div>
            <div
              style={{
                width: "90%",
                height: "70%",
                padding: "20px",
                margin: "auto",
                overflow: "auto",
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
                      margin: "10px auto",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "25px",
                        position: "relative",
                        right: "10%",
                        cursor: "pointer",
                        float: "right",
                        marginRight: "-50px",
                        marginTop: "-10px",
                      }}
                      onClick={() => removeVideoTimeStampAndSlide(i)}
                    >
                      <MdClose />
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
              <button onClick={() => fetchPostMethod()} className="saveButton">
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
