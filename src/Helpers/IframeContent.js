function timeStringToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(":");
  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return totalSeconds;
}

const iframeContent = (wistiaId, objContent) => {
  let arr = "";
  let videoHeading = "";
  let keyNotesHeading = "";
  if (objContent && objContent.keyNotesSlideState) {
    arr = objContent.keyNotesSlideState
      .map((item) => JSON.stringify(item))
      .join(" --> ");
  }
  if (objContent && objContent.videoHeading) {
    videoHeading = objContent.videoHeading;
  }
  if (objContent && objContent.keyNotesHeading) {
    keyNotesHeading = objContent.keyNotesHeading;
  }
  return `<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<style>
  body {
    margin: 0;
  }
</style>
<div
  style="
    width: 100%;
    height: 100%;
    background-color: #e7ecef;
    font-family: sans-serif;
  "
>
  <div style="width: 100%; height: auto; padding-top: 10px">
    <h3 style="color: white; text-align: center; margin-top: 10px">
      ${videoHeading}
    </h3>
  </div>
  <div style="width: 100%; height: auto; display: flex">
    <div
      style="
        height: calc(100vh - 100px);
        width: 100%;
        background-color: #e7ecef;
        display: flex;
        flex-direction: column;
      "
    >
      <div
        style="
          width: 96%;
          margin-top: 0%;
          margin-left: auto;
          margin-right: auto;
        "
        class="iframe-wrapper"
      >
        <script
          src="https://fast.wistia.com/embed/medias/${wistiaId}.jsonp"
          async
        ></script>
        <script
          src="https://fast.wistia.com/assets/external/E-v1.js"
          async
        ></script>
        <div
          class="wistia_responsive_padding"
          style="padding: 56.25% 0 0 0; position: relative"
        >
          <div
            class="wistia_responsive_wrapper"
            style="
              height: 100%;
              left: 0;
              position: absolute;
              top: 0;
              width: 100%;
            "
          >
            <div
              class="wistia_embed wistia_async_${wistiaId} seo=false videoFoam=true"
              style="height: 100%; position: relative; width: 100%"
            >
              <div
                class="wistia_swatch"
                style="
                  height: 100%;
                  left: 0;
                  opacity: 0;
                  overflow: hidden;
                  position: absolute;
                  top: 0;
                  transition: opacity 200ms;
                  width: 100%;
                "
              >
                <img
                  src="https://fast.wistia.com/embed/medias/${wistiaId}/swatch"
                  style="
                    filter: blur(5px);
                    height: 100%;
                    object-fit: contain;
                    width: 100%;
                  "
                  alt=""
                  aria-hidden="true"
                  onload="this.parentNode.style.opacity=1;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          width: 96%;
          height: 100%;
          background-color: white;
          margin: 20px auto auto auto;
          padding: 5px;
        "
      >
        <div style="width: 96%; margin: auto; height: auto; padding-top: 5px">
          <h3
            style="width: 30%; margin: auto auto 10px auto; text-align: center"
          >
            <!-- Transcript -->
          </h3>
          <div style="width: 100%; display: flex">
            <div style="position: relative">
              <input
                onchange="filterTranscript(this.value)"
                type="text"
                id="searchInput"
                name="searchInput"
                placeholder="Search..."
                style="
                  width: 200px;
                  height: 30px;
                  border-radius: 12px;
                  border: 1px solid;
                  text-align: center;
                "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  left: 10px;
                  cursor: pointer;
                "
              >
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l6 6 1.41-1.41-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </div>
            <div style="width: auto; display: flex">
              <text
                id="searchNumOfNum"
                style="
                  min-width: 60px;
                  max-width: auto;
                  text-align: center;
                  font-size: larger;
                "
                >0</text
              >
              <button
                style="
                  border-radius: 5px;
                  border: 1px solid;
                  background: #d9d9d9;
                "
                onclick="nextAndPrevSearch('Previous')"
              >
                Previous
              </button>
              <button
                style="
                  margin-left: 10px;
                  border-radius: 5px;
                  border: 1px solid;
                  background: #d9d9d9;
                "
                onclick="nextAndPrevSearch('Next')"
              >
                Next
              </button>
            </div>
            <button
              onclick="downloadHTMLasPDF('Transcript', 'captions')"
              style="
                height: 30px;
                float: right;
                background: none;
                border: none;
                color: black;
                border-radius: 5px;
                margin-left: auto;
                margin-right: 0px;
                cursor: pointer;
                font-size: 16px;
              "
            >
              <i class="fa fa-download" style="color: #2546f0"> </i>
              Download
            </button>
          </div>
        </div>
        <hr />
        <div
          id="Transcript"
          style="
            width: 96%;
            margin: auto;
            height: 25vh;
            overflow: scroll;
          "
        ></div>
      </div>
    </div>
    ${
      arr !== ""
        ? `
    <div style="height: calc(100vh - 100px); width: 100%">
      <div
        style="
          width: 90%;
          height: 100%;
          background-color: white;
          margin: 0% auto; /* padding: 20px; */
        "
      >
        <div style="width: 100%; height: 50px">
          <h1 style="float: left; margin-left: 20px">${keyNotesHeading}</h1>
          <button
            onclick="downloadHTMLasPDF('content', 'notes')"
            style="
              height: 40px;
              float: right;
              margin-top: 20px;
              margin-right: 20px;
              background: none;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
            "
          >
            <i class="fa fa-download" style="color: #2546f0"></i>
            Download
          </button>
        </div>
        <div
          style="width: 90%; height: 80%; padding: 20px; margin: auto"
          id="content"
        ></div>
      </div>
    </div>
    `
        : ""
    }
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script>
  let indexValue = 0;
  let searchIndex = 1;
  const result = [];
  let transcriptContent = "";
  let wistiaControl = "";
  const WistiaURL = "${wistiaId}";
  const arrOfData = '${arr}';
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
  function downloadHTMLasPDF(elementId, type) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF("l", "mm", [1500, 1400]);
    let pdfjs = document.getElementById(elementId).cloneNode(true);
    let divElement = document.createElement("div");
    const arrOfElem = pdfjs
      .querySelectorAll("p")
      .forEach((elem) => (elem.style.color = "black"));
    divElement.innerHTML = pdfjs.innerHTML;
    if (type === "captions") {
      divElement.innerHTML = "";
      let transcriptContentArr = transcriptContent.split("\\n\\n");
      transcriptContentArr.forEach((block, index) => {
        const lines = block.split("\\n");
        const timestamp = lines[1];
        const spokenLines = lines.slice(2);
        const spokenText = spokenLines.join(" ");
        const pElement = document.createElement("p");
        divElement.innerHTML += "<b>" + lines[0] + "</b>";
        divElement.innerHTML += "<p>" + timestamp + "</p>";
        divElement.innerHTML += "<p>" + spokenText + "</p>";
      });
    }
    divElement.style.width = "1000px";
    doc.html(divElement, {
      callback: function (doc) {
        doc.save(type + ".pdf");
      },
      x: 12,
      y: 12,
    });
  }
  function timecodeToSeconds(timecode) {
    const parts = timecode.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2].replace(",", "."));
    return hours * 3600 + minutes * 60 + seconds;
  }
  const filterTranscript = (value) => {
    result.length = 0;
    const previousResult = [];
    let transcriptsDiv = document.getElementById("Transcript");
    let pElementsArr = transcriptsDiv.querySelectorAll("p");
    for (let i = 0; i < pElementsArr.length; i++) {
      // console.log(pElementsArr[i].innerHTML);
      let xElem = pElementsArr[i].querySelectorAll("text");
      // xElem[0].style.color = "orange";
      // console.log(xElem);
      xElem.forEach((txtElem) => {
        if (txtElem.innerHTML.toLowerCase() === value) {
          // console.log(txtElem.innerHTML, value);
          // txtElem.style.color = "green";
          result.push(pElementsArr[i]);
        } else {
          previousResult.push(pElementsArr[i]);
        }
      });
      // if (
      //   pElementsArr[i].innerHTML
      //     .toLocaleLowerCase()
      //     .includes(value.toLocaleLowerCase())
      // ) {
      //   result.push(pElementsArr[i]);
      // } else {
      //   previousResult.push(pElementsArr[i]);
      // }
    }
    result.map((elem, i) => {
      // elem.style.color = "red";
      console.log(elem, "ELEMENET");
      let newElem = elem.querySelectorAll("text");
      newElem.forEach((txtElem) => {
        if (txtElem.innerHTML.toLowerCase() === value) {
          // console.log(txtElem.innerHTML, value);
          txtElem.style.color = "red";
          // result.push(pElementsArr[i]);
        }
      });
      result[0].focus();
      result[0].scrollIntoView();
      elem.onclick = () => {
        const elemTime = timecodeToSeconds(elem.id.split("/")[0]);
        wistiaControl.time(elemTime);
      };
      elem.onmouseover = () => {
        elem.style.border = "1px solid white";
        elem.style.cursor = "pointer";
      };
      elem.onmouseout = () => {
        elem.style.border = "none";
      };
    });
    previousResult.map((elem) => (elem.style.color = "black"));
    document.getElementById("searchNumOfNum").innerHTML =
      "1 / " + result.length;
  };
  const nextAndPrevSearch = (type) => {
    if (type === "Next") {
      if (searchIndex < result.length) {
        searchIndex++;
      } else {
        searchIndex = 1;
      }
    } else {
      if (searchIndex > 1) {
        searchIndex--;
      }
    }
    result[searchIndex - 1].focus();
    result[searchIndex - 1].scrollIntoView();
    document.getElementById("searchNumOfNum").innerHTML =
      searchIndex + "/" + result.length;
  };
  fetch("https://api.wistia.com/v1/medias/roc17q5zlb/captions.json", options)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("Transcript").innerHTML = "";
      transcriptContent = data[0].text;
      const captionBlocks = data[0].text.split("\\n\\n");
      captionBlocks.forEach((block, index) => {
        const lines = block.split("\\n");
        const timestamp = lines[1];
        const spokenLines = lines.slice(2);
        const spokenText = spokenLines.join(" ");
        const pElement = document.createElement("p");
        pElement.id = timestamp.split(" --> ").join("/");
        pElement.style.marginBlockStart = "0px";
        pElement.style.marginBlockEnd = "0px";
        pElement.style.fontFamily = "Arial, sans-serif";
        pElement.style.lineHeight = "28px";
        const pElementsArr = spokenText
          .split(" ")
          .map(
            (elem, i) =>
              "<text style=margin-block-start: 0; id='" +
              i +
              "'>" +
              elem +
              "</text>"
          );
        pElement.innerHTML = pElementsArr.join(" ");

        document.getElementById("Transcript").appendChild(pElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  window._wq = window._wq || [];
  _wq.push({
    id: "roc17q5zlb",
    options: {
      plugin: { "captions-v1": { onByDefault: true, language: "eng" } },
      time: "roc17q5zlb",
    },
    onReady: function (video) {
      video.playbackRate("{{playRate}}");
      // document.getElementsByClassName("w-vulcan-v2-button").style.display =
      //   "none";
      video.bind("playbackratechange", function (playbackRate) {
        document.getElementById("playRate").value = playbackRate;
      });
      wistiaControl = video;
      video.bind("play", function () {});
      video.bind("pause", function () {});
      video.bind("seek", function () {});
      function timeStringToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(":");
        const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        return totalSeconds;
      }
      function getUrlLink(str, time) {
        '<embed width="100%" height="500" src="' + str + '"></embed>';
        return (
          "<p>" +
          "<a href='#' " +
          "id='" +
          time +
          " '>" +
          time +
          "</a>" +
          " - " +
          str +
          "</p>"
        );
      }
      video.bind("timechange", function () {
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
            allElements[i].style.color = "black";
          }
        }
        const arr = arrOfData.split(" --> ");
        const obj = JSON.parse(arr[indexValue]);
        const time = timeStringToSeconds(obj.time);
        const urlLink = obj.Link;
        if (parseInt(video.time()) >= time) {
          document.getElementById("content").innerHTML += getUrlLink(
            urlLink,
            obj.time
          );
          console.log(358, 358);
          let allElements = document.getElementById("content").children;
          console.log(document.getElementById("content").children);
          for (let i = 0; i < allElements.length; i++) {
            console.log(allElements[i], 100);
            allElements[i].onclick = () => {
              wistiaControl.time(allElements[i].childNodes[0].id.split(":")[1]);
            };
          }
          indexValue++;
        }
      });
    },
  });
</script>
`;
};

export default iframeContent;
