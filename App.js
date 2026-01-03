let recorder, chunks = [];
const btn = document.getElementById("ptt");
const status = document.getElementById("status");
const audio = document.getElementById("audio");

btn.ontouchstart = async () => {
  status.textContent = "Listening...";
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
  chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.start();
};

btn.ontouchend = async () => {
  recorder.stop();
  status.textContent = "Processing...";

  recorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    // For beginner version, we simulate ATC reply
    // Later this can connect to AI server
    audio.src = "https://www.soundjay.com/button/beep-07.mp3"; // placeholder beep
    audio.play();
    status.textContent = "ATC Ready";
  };
};
