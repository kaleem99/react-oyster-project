function timeStringToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(":");
  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return totalSeconds;
}

const iframeContent = (wistiaId, objContent) => {
  let arr = "";
  if (objContent) {
    arr = objContent.map((item) => JSON.stringify(item)).join(" --> ");
  }

  return `<div style="width: 100%; height: 100%; background-color: #212021">
  <div style="width: 100%; height: 20px; background-color: #2f2f2f"></div>
  <div
    style="
      width: 100%;
      height: calc(100% - 20px);
      display: grid;
      grid-template-columns: 50% auto;
    "
  >
    <div style="height: 100%; width: 100%; background-color: #212021">
      <div
        style="
          width: 90%;
          margin-top: 20px;
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
          width: 90%;
          height: 300px;
          background-color: #2f2f2f;
          margin: 20px auto;
          padding: 5px;
        "
      >
        <div
          style="
            width: 98%;
            margin: auto;
            height: 40px;
            padding-top: 5px;
            color: white;
          "
        >
          <h2 style="width: 30%; margin: auto; color: white; float: left">
            Transcript
          </h2>
          <div style="float: right; width: auto; display: flex">
            <label>search captions</label>
            <input
              onchange="filterTranscript(this.value)"
              style="width: 200px; height: 30px"
            />
            <div style="width: auto; display: flex">
              <button onclick="nextAndPrevSearch('Previous')">prev</button>
              <text
                id="searchNumOfNum"
                style="
                  min-width: 40px;
                  max-width: auto;
                  text-align: center;
                  font-size: larger;
                "
                >0</text
              >
              <button onclick="nextAndPrevSearch('Next')">next</button>
            </div>
          </div>
        </div>
        <hr />
        <div
          id="Transcript"
          style="
            width: 80%;
            margin: auto;
            height: 200px;
            overflow: auto;
            padding: 10px;
            background-color: #2f2f2f;
            color: white;
          "
        ></div>
      </div>
    </div>
    <div style="height: 100%; width: 100%">
        <div
          style="
            width: 90%;
            height: 96%;
            background-color: white;
            margin: 2% auto; /* padding: 20px; */
          "
        >
          <div style="width: 100%; height: 50px">
            <button
              onclick="downloadHTMLasPDF('Transcript', 'captions')"
              style="
                height: 40px;
                float: left;
                margin-top: 20px;
                margin-left: 20px;
                background-color: #212021;
                border: none;
                color: white;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              Download captions
            </button>
            <button
              onclick="downloadHTMLasPDF('content', 'notes')"
              style="
                height: 40px;
                float: right;
                margin-top: 20px;
                margin-right: 20px;
                background-color: #212021;
                border: none;
                color: white;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              Download Notes
            </button>
          </div>
          <div
            style="width: 90%; height: 80%; padding: 20px; margin: auto"
            id="content"
          ></div>
        </div>
      </div>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script>
  let indexValue = 0;
  let searchIndex = 1;
  const result = [];
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
    divElement.style.width = "1000px";
    doc.html(divElement, {
      callback: function (doc) {
        doc.save(type + '.pdf');
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
      if (
        pElementsArr[i].innerHTML
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase())
      ) {
        result.push(pElementsArr[i]);
      } else {
        previousResult.push(pElementsArr[i]);
      }
    }
    result.map((elem, i) => {
      elem.style.color = "red";
      result[0].focus();
      result[0].scrollIntoView();
      elem.onclick = () => {
        const elemTime = timecodeToSeconds(elem.id.split("/")[0]);
        wistiaControl.time(elemTime);
      };
      elem.onmouseover = () => {
        elem.style.border = "1px solid white";
      };
      elem.onmouseout = () => {
        elem.style.border = "none";
      };
    });
    previousResult.map((elem) => (elem.style.color = "white"));
    document.getElementById(
      "searchNumOfNum"
    ).innerHTML = '1 / ' + result.length;
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
    document.getElementById(
      "searchNumOfNum"
    ).innerHTML = searchIndex +  '/' + result.length;
  };
  fetch("https://api.wistia.com/v1/medias/${wistiaId}/captions.json", options)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("Transcript").innerHTML = "";
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
        pElement.innerHTML = spokenText;
        document.getElementById("Transcript").appendChild(pElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  window._wq = window._wq || [];
  _wq.push({
    id: "${wistiaId}",
    options: {
      plugin: {
        "captions-v1": {
          onByDefault: true,
          language: "eng",
        },
      },
      time: "roc17q5zlb",
    },
    onReady: function (video) {
      video.playbackRate("{{playRate}}");
      video.bind("playbackratechange", function (playbackRate) {
        document.getElementById("playRate").value = playbackRate;
      });

      video.bind("play", function () {
      });

      video.bind("pause", function () {
       
      });

      video.bind("seek", function () {
       
      });
      
      function timeStringToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(":");
        const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        return totalSeconds;
      }
      function getUrlLink(str) {
        '<embed width="100%" height="500" src="' + str + '"></embed>';
        return "<h1>" + str + "</h1>";
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
            allElements[i].style.color = "white";
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
          indexValue++;
        }
      });
    },
  });
</script>
`;
};

export default iframeContent;
