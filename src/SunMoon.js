import {useState,useEffect} from "react";
import SunCalc from "suncalc";

export default function SunMoon() {
  const csslistjson = [
    { topcsslist: 70, leftcsslist: -10, rotatecsslist: 315 },
    { topcsslist: 60, leftcsslist: -1, rotatecsslist: 322.5 },
    { topcsslist: 50, leftcsslist: 8.2, rotatecsslist: 330 },
    { topcsslist: 40, leftcsslist: 17.3, rotatecsslist: 337.5 },
    { topcsslist: 30, leftcsslist: 26.4, rotatecsslist: 345 },
    { topcsslist: 20, leftcsslist: 35.5, rotatecsslist: 352.5 },
    { topcsslist: 10, leftcsslist: 44.6, rotatecsslist: 360 },
    { topcsslist: 20, leftcsslist: 53.7, rotatecsslist: 7.5 },
    { topcsslist: 30, leftcsslist: 62.8, rotatecsslist: 15 },
    { topcsslist: 40, leftcsslist: 71.9, rotatecsslist: 22.5 },
    { topcsslist: 50, leftcsslist: 81, rotatecsslist: 30 },
    { topcsslist: 60, leftcsslist: 90.1, rotatecsslist: 37.5 },
  ];
  const [cssposition, setcssposition] = useState(0);
  const [daynight, setdaynight] = useState(false);
  const [lsborderradius, setlsborderradius] = useState("");
  const changedaynight = (t) => {
    setdaynight(t);
    var className = t ? "bodydark" : "";
    document.body.className = className;
    if (t) {
      moonPhase(new Date());
    }
  };
  const handleOnChange = () => {
    changedaynight(!daynight);
  };
  const positionsunmoon = () => {
    var e = new Date().getHours(),
      t = true;
    if (e <= 5) {
      e += 6;
    } else if (e >= 6 && e <= 17) {
      t = false;
      e -= 6;
    } else {
      e -= 18;
    }
    changedaynight(t);
    setcssposition(e);
  };
  const moonPhase = (e) => {
    var t = SunCalc.getMoonIllumination(e);
    var n = t.fraction;
    var shadowRadius = Math.abs(50 - 100 * n);
    setlsborderradius(shadowRadius + "%/50%");
  };
  setTimeout(() => {
    positionsunmoon();
  }, 6e4);
  useEffect(() => {
    positionsunmoon();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="background"></div>
      <div className={`${daynight?"hidden":"block"} float-left origin-[bottom_center] shadow-[0_0_64px_#fc0,0_0_0_#fc0,-1px_0_20px_4px_#2c0101] z-[-9] rounded-[50%] fixed md:w-[10vw] w-[100px] md:h-[10vw] h-[100px] after:content-[''] after:absolute md:after:top-[2vh] after:top-[12px] md:after:right-[2vw] after:right-[18px] md:after:w-[1.5vw] after:w-[10px] md:after:h-[1.5vw] after:h-[10px] after:opacity-80 after:bg-[#fcf0a3] after:rounded-[44%_40%_60%_24%_/_43%_35%_51%_36%]`} style={{ left: csslistjson[cssposition].leftcsslist + "%", top: csslistjson[cssposition].topcsslist + "%", transform:"rotate(" + csslistjson[cssposition].rotatecsslist + "deg)",}}>
        <div className="w-full h-full animate-[sunrolling_30s_infinite]">
          <div className="w-full h-full rounded-[100%] bg-[#ffdf05] shadow-[0_0_100px_#ffdf05]"></div>
          {[...Array(12).keys()].map((i) => {
            return (
              <div className="absolute top-[-30%] left-[50%] w-[2px] h-[160%]" key={i} style={{transform: `rotate(${18*i}deg)`}}>
                <b className="absolute top-0 left-0 w-full h-[12%] bg-[#fed65b] rounded-[50%]"></b>
                <s className="absolute bottom-0 left-0 w-full h-[12%] bg-[#fed65b] rounded-[50%]"></s>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${daynight?"block":"hidden"} fixed overflow-hidden rounded-[50%] w-[25vmin] h-[25vmin] z-[-9] origin-[bottom_center]`} style={{ left: csslistjson[cssposition].leftcsslist + "%", top: csslistjson[cssposition].topcsslist + "%", transform:"rotate(" + csslistjson[cssposition].rotatecsslist + "deg)",}}>
        <div className="absolute overflow-hidden m-[0_auto] z-[12] w-[25vmin] h-[25vmin] top-[calc(50%-12.5vmin)] right-[calc((50%-12.5vmin)_-_-91.1315%)]" style={{ borderRadius: lsborderradius }}></div>
        <div className="relative shadow-[#4b326480_0_0_6.25vmin_0.25vmin_inset] overflow-hidden m-[0_auto] z-[11] w-[25vmin] h-[25vmin] animate-[move-map_30s_infinite_linear] after:content-[''] after:absolute after:w-full after:h-full after:rounded-[100%] after:top-0 after:left-0 after:bg-[radial-gradient(circle_at_50%_30%,#09090700,#00000033_50%,#000_100%)]" style={{ borderRadius: lsborderradius,background: `url("http://koushikchandrasaha.thekoushikdurgas.in/img/moonsurface.jpg") repeat-x`,transformStyle: `preserve-3d`,backgroundSize: `auto 100%` }}></div>
      </div>
      <div className="fixed z-[10000] top-0 left-0">
        <label>
          <input className="toggle-checkbox absolute opacity-0 cursor-pointer w-0 h-0" type="checkbox" checked={daynight} onChange={handleOnChange} />
          <div className={`toggle-slot relative h-[3em] w-[3em] md:h-[4vw] md:w-[4vw] border-2 ${daynight?"bg-[#374151] border-white":"bg-[#f5eb42] border-[#b89000]"} rounded-[0_50%_50%_50%] duration-250 shadow-[0_0_11px_0_#2c0101,inset_0_0_12px_0_#2c0101]`}>
            <div className={`absolute w-full h-full flex origin-[50%_50%] items-center justify-center ${daynight?"opacity-0 rotate-0":"opacity-100 rotate-[360deg]"}`}>
              <i className="tkd2-sun2 md:text-[2.5vw] text-[30px] text-[#b89000]" style={{"textShadow":"0 0 4px #ffe999, 0 0 12px #ffe999, 0 0 7px #2c0101"}} />
            </div>
            <div className={`absolute w-full h-full flex origin-[50%_50%] items-center justify-center ${daynight?"opacity-100 rotate-[360deg]":"opacity-0 rotate-0"}`}>
              <i className="tkd3-moon-dreamy md:text-[2.5vw] text-[30px] text-white" style={{"textShadow":"0 0 4px #ecf0f1, 0 0 12px #ecf0f1, 0 0 7px #2c0101"}} />
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
