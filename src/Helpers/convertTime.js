const convertTime = (timeInSeconds) => {
  let minutes = parseInt(timeInSeconds / 60);
  let seconds = parseInt(timeInSeconds % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

export default convertTime;
