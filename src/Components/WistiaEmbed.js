import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import convertTime from "../Helpers/convertTime";
import iframeContent from "../Helpers/IframeContent";
import { MdFullscreen, MdContentCopy, MdFullscreenExit } from "react-icons/md";

const WistiaVideo = ({ wistiaId, logsFile, setVideoTime }) => {
  console.log(logsFile);
  const [isExpaned, setIsExpaned] = useState(false);
  const [body, setBody] = useState("");
  console.log(wistiaId);
  useEffect(() => {
    const WistiaHeaders = {
      Authorization: "Bearer YOUR_API_KEY",
    };
    const options = {
      headers: {
        Authorization:
          "Bearer 185e6a59d70559fdf59fe891201cf3f96d0c6e645b9aa4e7e1f0bf645ad2bed9",
      },
      method: "get",
    };

    fetch(`https://api.wistia.com/v1/medias/${wistiaId}/captions.json`, options)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        document.getElementById("Transcript").innerHTML = "";
        const captionBlocks = data[0].text.split("\n\n");
        console.log(data, 31);
        captionBlocks.forEach((block, index) => {
          const lines = block.split("\n");
          const timestamp = lines[1];
          const spokenLines = lines.slice(2);
          const spokenText = spokenLines.join(" ");

          const pElement = document.createElement("p");
          pElement.id = timestamp.split(" --> ").join("/");
          pElement.style.marginBlockStart = "0px";
          pElement.style.marginBlockEnd = "0px";
          pElement.style.fontFamily = "Arial, sans-serif";
          pElement.style.lineHeight = "28px";
          pElement.innerHTML = spokenText;
          document.getElementById("Transcript").appendChild(pElement);
          setBody(
            <div
              className="wistia_responsive_wrapper"
              style={{
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            >
              <div
                className={`wistia_embed wistia_async_${wistiaId}`}
                style={{
                  height: "100%",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  className="wistia_swatch"
                  style={{
                    height: "100%",
                    left: 0,
                    opacity: 0,
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    transition: "opacity 200ms",
                    width: "100%",
                  }}
                >
                  <img
                    src={`https://fast.wistia.com/embed/medias/${wistiaId}/swatch`}
                    style={{
                      filter: "blur(5px)",
                      height: "100%",
                      objectFit: "contain",
                      width: "100%",
                    }}
                    alt=""
                    aria-hidden="true"
                    onLoad={(e) => (e.target.parentNode.style.opacity = 1)}
                  />
                </div>
              </div>
            </div>
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });

    window._wq = window._wq || [];
    window._wq.push({
      id: wistiaId,
      options: {
        plugin: {
          "captions-v1": {
            onByDefault: true,
            language: "eng",
          },
        },
        // time: wistiaId,
      },
      onReady: function (video) {
        video.playbackRate("{{playRate}}");
        video.bind("playbackratechange", function (playbackRate) {
          //   document.getElementById("playRate").value = playbackRate;
        });

        video.bind("play", function () {
          //   document.getElementById("autoScroll").innerHTML = "on";
        });
        function timecodeToSeconds(timecode) {
          const parts = timecode.split(":");
          const hours = parseInt(parts[0], 10);
          const minutes = parseInt(parts[1], 10);
          const seconds = parseFloat(parts[2].replace(",", "."));
          return hours * 3600 + minutes * 60 + seconds;
        }

        video.bind("timechange", function () {
          setVideoTime(convertTime(video.time()));

          let element = document.getElementById("Transcript");
          let allElements = element.querySelectorAll("p");
          for (let i = 0; i < allElements.length; i++) {
            let timeStamps = allElements[i].id.split("/");
            let start = timecodeToSeconds(timeStamps[0]);
            let end = timecodeToSeconds(timeStamps[1]);
            if (video.time() >= start && video.time() <= end) {
              allElements[i].focus();
              allElements[i].style.color = "#41B8E1";
              allElements[i].scrollIntoView();
            } else {
              allElements[i].blur();
              allElements[i].style.color = "white";
            }
          }
          //   console.log(video.time());
          //   if (video.time() >= 56) {
          //     let contentDiv = document.getElementById("content");
          //     contentDiv.innerHTML =
          //       `<h2>${objContent.heading}</h2>` +
          //       "<br>" +
          //       `<li>${objContent.list}</li>`;
          //   }
        });
      },
    });
  }, [wistiaId]);
  const wistiaScriptURL = `https://fast.wistia.com/embed/medias/${wistiaId}.json`;

  return (
    <div style={{ width: "50%", height: "100%", backgroundColor: "#212021" }}>
      {/* <div
        style={{ width: "100%", height: "80px", backgroundColor: "#2f2f2f" }}
      ></div> */}
      <div style={{ width: "100%", height: "auto" }}>
        <div
          style={{ height: "auto", width: "auto", backgroundColor: "#212021" }}
        >
          <div
            style={{
              width: "80%",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="iframe-wrapper"
          >
            <Helmet>
              <script
                src="https://fast.wistia.com/assets/external/E-v1.js"
                async
              ></script>
              <script src={wistiaScriptURL} async></script>
            </Helmet>
            <div
              id="WistiaVideo"
              className="wistia_responsive_padding"
              style={{ padding: "56.25% 0 0 0", position: "relative" }}
            >
              {body}
            </div>
          </div>
          <div
            style={{
              width: "80%",
              height: "300px",
              backgroundColor: "#2f2f2f",
              margin: "10px auto",
              padding: "5px",
            }}
          >
            <h2 style={{ width: "80%", margin: "auto", color: "white" }}>
              Transcript
            </h2>
            <hr />
            <div
              id="Transcript"
              style={{
                width: "80%",
                margin: "auto",
                height: "200px",
                overflow: "auto",
                padding: "10px",
                backgroundColor: "#2f2f2f",
                color: "white",
                textAlign: "left",
              }}
            ></div>
          </div>
          <div
            id="IframeContent"
            style={{
              width: "80%",
              height: "100px",
              backgroundColor: "#2f2f2f",
              margin: "10px auto",
              padding: "5px",
            }}
          >
            <h2 style={{ width: "80%", margin: "auto", color: "white" }}>
              Iframe
            </h2>
            <span
              id="elementCopied"
              style={{
                position: "absolute",
                top: -25,
                left: 10,
                background: "white",
                padding: 5,
                display: "none",
              }}
            >
              Text Copied
            </span>
            <button
              onClick={() => {
                const result = document.getElementById("Iframe");
                navigator.clipboard.writeText(
                  result.innerHTML
                    .replace(/&lt;/gi, "<")
                    .replace(/&gt;/gi, ">")
                    .replace(/amp;/gi, "")
                );
                console.log(result.textContent);
                // result.focus();
                result.className = "IframeCopied";
                let elementCopied = document.getElementById("elementCopied");
                elementCopied.style.display = "inline";
                setTimeout(() => {
                  elementCopied.style.display = "none";
                  result.className = "";
                }, 2500);
              }}
              style={{
                width: "100px",
                height: "30px",
                float: "left",
                marginTop: "-25px",
              }}
            >
              <MdContentCopy />
            </button>
            <button
              onClick={() => {
                setIsExpaned(!isExpaned);
                const IframeContent = document.getElementById("IframeContent");
                const Iframe = document.getElementById("Iframe");

                if (!isExpaned) {
                  IframeContent.style.position = "absolute";
                  IframeContent.style.width = "40%";
                  IframeContent.style.height = "400px";
                  IframeContent.style.left = "0%";
                  IframeContent.style.bottom = "0%";
                  IframeContent.style.top = "0%";
                  IframeContent.style.right = "0%";
                  IframeContent.style.margin = "auto";
                  IframeContent.style.border = "3px solid gray";

                  // Iframe.style.width = "80%"
                  Iframe.style.height = "300px";
                } else {
                  IframeContent.style.position = "static";
                  IframeContent.style.width = "80%";
                  IframeContent.style.height = "100px";
                  // Iframe.style.width = "80%"
                  Iframe.style.height = "30px";
                  IframeContent.style.border = "none";
                }
              }}
              style={{
                width: "100px",
                height: "30px",
                float: "right",
                marginTop: "-25px",
                fontSize: "larger",
              }}
            >
              {!isExpaned ? <MdFullscreen /> : <MdFullscreenExit />}
            </button>
            <hr />
            <div
              id="Iframe"
              style={{
                width: "90%",
                margin: "auto",
                height: "30px",
                overflow: "auto",
                padding: "10px",
                backgroundColor: "#2f2f2f",
                color: "white",
                textAlign: "left",
              }}

              //   contentEditable="true"
            >
              {iframeContent(wistiaId, logsFile[wistiaId])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WistiaVideo;
