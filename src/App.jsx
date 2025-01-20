import { useState, useRef, useEffect } from "react";

function App() {

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
      songName: "Hawayein",
      songArtist: "Rohit Deka",
      songSrc: "/Assets/songs/hawayein.mp3",
      songAvatar: "./Assets/Images/image3.jpg",
  });
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const currentAudio = useRef();

  const musicAPI = [

    {
      songName: "Hawayein",
      songArtist: "Rohit Deka",
      songSrc: "/Assets/songs/hawayein.mp3",
      songAvatar: "./Assets/Images/image3.jpg",
    },
    
    
    {
      songName: "Apna Bana Le",
      songArtist: "Arijit Singh",
      songSrc:
        "./Assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm",
      songAvatar: "/Assets/Images/image7.jpg",
    },

    {
      songName: "Aurora Runaway",
      songArtist: "TEGNENT",
      songSrc: "./Assets/songs/Catch Me If I Fall - NEFFEX.mp3",
      songAvatar: "./Assets/Images/image2.jpg",
    },

    {
      songName: "Inspired (Clean)",
      songArtist: "NEFFEX",
      songSrc: "./Assets/songs/Inspired (Clean) - NEFFEX.mp3",
      songAvatar: "./Assets/Images/image3.jpg",
    },

  ];



  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      setMusicIndex(0);
      updateCurrentMusicDetails(0);
    } else {
      setMusicIndex(musicIndex + 1);
      updateCurrentMusicDetails(musicIndex + 1);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      setMusicIndex(musicAPI.length - 1);
      updateCurrentMusicDetails(musicAPI.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
      updateCurrentMusicDetails(musicIndex - 1);
    }
  };

  useEffect(() => {
    if (currentAudio.current) {
      currentAudio.current.src = currentMusicDetails.songSrc;
    }
  }, []);
  

  const updateCurrentMusicDetails = (index) => {
    const music = musicAPI[index];
    setCurrentMusicDetails({
      songName: music.songName,
      songArtist: music.songArtist,
      songSrc: music.songSrc,
      songAvatar: music.songAvatar,
    });


    currentAudio.current.src = music.songSrc;
    currentAudio.current.load(); 
    currentAudio.current.play(); 
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {

    const duration = currentAudio.current.duration;
    const currentTime = currentAudio.current.currentTime;


    if (duration && !isNaN(duration)) {
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);
      setMusicTotalLength(`${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`);
    }

    if (currentTime && !isNaN(currentTime)) {
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      setMusicCurrentTime(`${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`);
    }

    const progress = (currentTime / duration) * 100;
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <div className="container relative w-full h-screen">
      <audio
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <video
        src="./Assets/Videos/video3.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      <div className="blackScreen absolute bg-black bg-opacity-50 h-full w-full top-0 left-0"></div>

      <div className="music-container absolute h-full w-full flex flex-col items-center justify-center text-center space-y-5 text-white px-4 md:px-0">
        <div className="flex flex-col justify-center w-full md:w-[400px] space-y-2 backdrop-blur rounded-[34px] p-5 md:p-10 shadow-xl transition-all ease-in-out hover:shadow-2xl">
          <p className="musicPlayer text-sm">Music Player</p>
          <p className="music-Head-Name text-3xl md:text-4xl font-bold truncate">
            {currentMusicDetails.songName}
          </p>
          <p className="music-Artist-Name text-opacity-35 truncate">
            {currentMusicDetails.songArtist}
          </p>

          <div className="flex justify-center">
            <img
              src={currentMusicDetails.songAvatar}
              id="songAvatar"
              className="select-none h-32 w-32 md:h-40 md:w-40 object-cover rounded-full border-opacity-25"
            />
          </div>

          <div className="p-2 select-none">
            <div className="musicTimerDiv flex justify-between h-5 w-full">
              <p className="musicCurrentTime text-sm m-0">{musicCurrentTime}</p>
              <p className="musicCurrentTime text-sm m-0">{musicTotalLength}</p>
            </div>

            <input
              type="range"
              name="musicProgressBar"
              className="musicProgressBar w-full h-1 bg-purple-100 rounded-lg appearance-none outline-none"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${audioProgress}%, #374151 ${audioProgress}%, #374151 100%)`,
              }}
              value={audioProgress}
              max="100"
              onChange={handleMusicProgressBar}
            />

            <div className="musicControlers flex space-x-5 justify-center h-10 gap-5 items-center mt-3 select-none">
              <i
                className="fa-solid fa-backward text-2xl text-gray-300 hover:text-white"
                onClick={handlePrevSong}
              ></i>

              <i
                className={`fa-solid ${isAudioPlaying ? "fa-circle-pause" : "fa-circle-play"} text-4xl text-gray-300 hover:text-white`}
                onClick={handleAudioPlay}
              ></i>

              <i
                className="fa-solid fa-forward text-2xl text-gray-300 hover:text-white"
                onClick={handleNextSong}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
