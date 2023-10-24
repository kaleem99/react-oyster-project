import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function WistiaEmbed({
  videoId,
  play = true,
  options = {
    preload: true,
    muted: true,
    playsinline: true,
    autoPlay: true,
    silentAutoPlay: true,
    endVideoBehavior: "loop",
  },
  responsive = true,
  padding = "56.25% 0 0", // Wistia's default
  width = "90%",
}) {
  const [video, setVideo] = useState();
  const [time, setTime] = useState(0);

  window._wq = window._wq || [];
  window._wq.push({
    id: videoId,
    onFind: function (video) {
      video.addPlugin("myPluginName", {
        src: "https://wiggly-tree-nectarine.glitch.me/my-plugin.js",
      });
    },
    onHasData: () => {
      console.log("onHasData");
    },
    onReady: function (video) {
      console.log(video.duration(), 'playing');
      // setVideoTime(video.duration());
      
      setTime(video.time());
    },
    onchange: function (video) {
      console.log(video.time());
    },

    onplay: () => {
      console.log("playing");
    },
  });
 if(video){
   video.bind("timechange", function(t) {
    console.log("the time changed to " + t);
  });
 }
  return (
    <div className="iframe-wrapper">
      <Helmet>
        <script
          src="https://fast.wistia.com/assets/external/E-v1.js"
          async
        ></script>
        <script
          src={`https://fast.wistia.com/embed/medias/${videoId}.json`}
          async
        ></script>
      </Helmet>

      <div
        // ref={containerRef}
        className="wistia_responsive_padding"
        style={{
          padding: padding,
          position: "relative",
          width: width,
          margin: "20px auto",
        }}
      >
        <div
          className="wistia_responsive_wrapper"
          style={{
            position: "absolute",
            height: "100%",
            left: 0,
            top: 0,
            width: "100%",
          }}
        >
          <div
            className={`wistia_embed wistia_async_${videoId} videoFoam=true`}
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
                src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`}
                style={{
                  filter: "blur(5px)",
                  height: "100%",
                  objectFit: "contain",
                  width: "100%",
                }}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
