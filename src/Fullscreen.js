import {useState,useEffect} from 'react';

export default function Fullscreen() {
    const [fullscreen,setFullscreen] = useState(false);
    const showfullscreen = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            setFullscreen(false);
        } else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            setFullscreen(true);
        }
    }
    useEffect(() => {
        document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? setFullscreen(true): setFullscreen(false);
    }, [])
  return (
    <div className={`dz-fullscreen fullscreen md:w-[4vw] w-[50px] ${fullscreen?"full":""}`} onClick={() => {showfullscreen();}}>
      <svg className="fs-icon bg-tkd1 drop-shadow-[var(--tkd2)_0_0_0.5rem] transition duration-50 ease-out rounded-[5px]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
        <path className="tr arrow" d="M74.6 33.6l0-4.3L63.2 40.7c-1.1 1.1-2.8 1.1-3.8 0c-1.1-1.1-1.1-2.8 0-3.9l11.4-11.4h-4.3 c-1.5 0-2.7-1.2-2.7-2.7c0-1.5 1.2-2.7 2.7-2.7h10.9c1.5 0 2.7 1.2 2.7 2.7v10.9c0 1.5-1.2 2.7-2.7 2.7 C75.8 36.3 74.6 35.1 74.6 33.6z" />
        <path className="tl arrow" d="M33.6 25.4h-4.3l11.4 11.4c1.1 1.1 1.1 2.8 0 3.8c-1.1 1.1-2.8 1.1-3.8 0L25.4 29.3v4.3 c0 1.5-1.2 2.7-2.7 2.7c-1.5 0-2.7-1.2-2.7-2.7V22.7c0-1.5 1.2-2.7 2.7-2.7l10.9 0c1.5 0 2.7 1.2 2.7 2.7 C36.3 24.2 35.1 25.4 33.6 25.4z" />
        <path className="bl arrow" d="M25.4 66.4l0 4.3l11.4-11.4c1.1-1.1 2.8-1.1 3.8 0c1.1 1.1 1.1 2.8 0 3.9L29.3 74.6h4.3 c1.5 0 2.7 1.2 2.7 2.7c0 1.5-1.2 2.7-2.7 2.7H22.7c-1.5 0-2.7-1.2-2.7-2.7V66.4c0-1.5 1.2-2.7 2.7-2.7 C24.2 63.7 25.4 64.9 25.4 66.4z" />
        <path className="br arrow" d="M66.4 74.6h4.3L59.3 63.2c-1.1-1.1-1.1-2.8 0-3.8c1.1-1.1 2.8-1.1 3.8 0l11.4 11.4v-4.3 c0-1.5 1.2-2.7 2.7-2.7c1.5 0 2.7 1.2 2.7 2.7v10.9c0 1.5-1.2 2.7-2.7 2.7l-10.9 0c-1.5 0-2.7-1.2-2.7-2.7 C63.7 75.8 64.9 74.6 66.4 74.6z" />
        <path className="fill-tkd2" d="M94 5c0.5 0 1 0.5 1 1v88c0 0.5-0.5 1-1 1H6c-0.5 0-1-0.5-1-1V6c0-0.5 0.5-1 1-1H94 M94 0H6C2.7 0 0 2.7 0 6v88 c0 3.3 2.7 6 6 6h88c3.3 0 6-2.7 6-6V6C100 2.7 97.3 0 94 0L94 0z" />
      </svg>
    </div>
  )
}
