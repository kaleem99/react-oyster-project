const iframeContent = (wistiaId, objContent) => {
  return `<iframe title="1" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" height="700px" width="800px" srcdoc="<div style=\'width: 100%; height: 100%; background-color: #212021\'> <div style=\'width: 100%; height: 80px; background-color: #2f2f2f\'></div> <div style=\'width: 100%; height: calc(100% - 80px); display: grid; grid-template-columns: 50% auto;\'> <div style=\'height: 100%; width: 100%; background-color: #212021\'> <div style=\'width: 90%; margin-top: 20px; margin-left: auto; margin-right: auto;\' class=\'iframe-wrapper\'> <script src=\'https://fast.wistia.com/embed/medias/${wistiaId}.jsonp\' async></script> <script src=\'https://fast.wistia.com/assets/external/E-v1.js\' async></script> <div class=\'wistia_responsive_padding\' style=\'padding: 56.25% 0 0 0; position: relative\'> <div class=\'wistia_responsive_wrapper\' style=\'height: 100%; left: 0; position: absolute; top: 0; width: 100%;\'> <div class=\'wistia_embed wistia_async_${wistiaId} seo=false videoFoam=true\' style=\'height: 100%; position: relative; width: 100%\'> <div class=\'wistia_swatch\' style=\'height: 100%; left: 0; opacity: 0; overflow: hidden; position: absolute; top: 0; transition: opacity 200ms; width: 100%;\'> <img src=\'https://fast.wistia.com/embed/medias/${wistiaId}/swatch\' style=\'filter: blur(5px); height: 100%; object-fit: contain; width: 100%;\' alt=\'\' aria-hidden=\'true\' onload=\'this.parentNode.style.opacity=1;\'></div></div></div></div></div><div style=\'height: 100%; width: 100%\'><div style=\'width: 90%; height: 96%; background-color: white; margin: 2% auto;\'> <div style=\'width: 90%; height: 80%; padding: 20px\' id=\'content\'></div></div></div></div></div> <script> const WistiaURL = "${wistiaId}"; // Replace with your actual Wistia URL const WistiaHeaders = { // Add your headers here, e.g., API keys or authentication tokens Authorization: "Bearer YOUR_API_KEY", }; const options = { headers: { Authorization: "Bearer 185e6a59d70559fdf59fe891201cf3f96d0c6e645b9aa4e7e1f0bf645ad2bed9", }, method: "get", };fetch('https://api.wistia.com/v1/medias/${wistiaId}/captions.json', options) .then((response) => response.json()) .then((data) => { // Handle the response data here document.getElementById("Transcript").innerHTML = ""; const captionBlocks = data[0].text.split("\\n\\n"); captionBlocks.forEach((block, index) => { const lines = block.split("\\n"); const timestamp = lines[1]; const spokenLines = lines.slice(2); const spokenText = spokenLines.join(" "); const pElement = document.createElement("p"); pElement.id = timestamp.split(" --> ").join("/"); pElement.style.marginBlockStart = "0px"; pElement.style.marginBlockEnd = "0px"; pElement.style.fontFamily = "Arial, sans-serif"; pElement.style.lineHeight = "28px"; pElement.innerHTML = spokenText; document.getElementById("Transcript").appendChild(pElement); }); }) .catch((error) => { console.error(error); }); window._wq = window._wq || []; _wq.push({ id: "${wistiaId}", options: { plugin: { "captions-v1": { onByDefault: true, language: "eng", }, }, time: "${wistiaId}", }, onReady: function (video) { video.playbackRate("{{playRate}}"); video.bind("playbackratechange", function (playbackRate) { document.getElementById("playRate").value = playbackRate; }); video.bind("play", function () { document.getElementById("autoScroll").innerHTML = "on"; }); video.bind("pause", function () { CCs = getCCs(); console.log(CCs); for (let i = 0; i < CCs.length; i++) { elmnt = document.getElementById(CCs[i][0] + "/" + CCs[i][1]); if (elmnt.style.color == "black") { elmnt.focus(); } } }); video.bind("seek", function () { CCs = getCCs(); for (let i = 0; i < CCs.length; i++) { document.getElementById("autoScroll").innerHTML = "on"; } }); function timecodeToSeconds(timecode) { const parts = timecode.split(":"); const hours = parseInt(parts[0], 10); const minutes = parseInt(parts[1], 10); const seconds = parseFloat(parts[2].replace(",", ".")); return hours * 3600 + minutes * 60 + seconds; } video.bind("timechange", function () { let element = document.getElementById("Transcript"); let allElements = element.querySelectorAll("p"); for (let i = 0; i < allElements.length; i++) { let timeStamps = allElements[i].id.split("/"); let start = timecodeToSeconds(timeStamps[0]); let end = timecodeToSeconds(timeStamps[1]); if (video.time() >= start && video.time() <= end) { allElements[i].focus(); allElements[i].style.color = "#41B8E1"; allElements[i].scrollIntoView(); } else { allElements[i].blur(); allElements[i].style.color = "white"; } } if (video.time() >= 56) { let contentDiv = document.getElementById("content"); contentDiv.innerHTML = '<h2>${objContent.heading}</h2>' + "<br>" + '<li>${objContent.list}</li>'; } }); }, }); </script></iframe>`;
};

export default iframeContent;
