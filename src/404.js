import {useState,useEffect} from "react";
import Cookies from 'js-cookie';
export default function Error() {
  const [render, setrender] = useState(true);
  document.title = `Error - TheKoushikDurgas`;
  const errorjson = [
    {'icon':'tkd3-home1','link':'http://thekoushikdurgas.in/','title':'Homepage',},
    {'icon':'tkd11-search-engine','link':'http://thekoushikdurgas.in/dashboard/','title':'Search',},
    {'icon':'tkd9-helping-hands','link':'http://help.thekoushikdurgas.in/','title':'Help & Support',}
  ]
  useEffect(() => {
    if(render){
      Cookies.set('priviousurl', 'http://404.thekoushikdurgas.in/', { path: '', domain: '.thekoushikdurgas.in' });
      setrender(false);
    }
  }, [render]);
  return (
    <div className="w-full h-full grid justify-center leading-[1] gap-5 animate-[0.7s_ease_0s_1_normal_none_running_zoomin]">
      <div className="relative grid justify-items-center">
        <img src='http://koushikchandrasaha.thekoushikdurgas.in/img/404.png' alt="404 Error" className="w-[35vmin]" />
        <p className="absolute w-max bottom-[5vh] font-['Mr_Dafoe'] md:text-[8vw] text-[70px] text-center text-white rotate-[-7deg]" style={{textShadow:'0 0 0.05em #fff, 0 0 0.2em #fe05e1, 0 0 0.3em #fe05e1'}}>404 error</p>
      </div>
      <p className="md:text-[4vw] text-[40px] text-center text-transparent" style={{"WebkitTextStrokeWidth":"1px","textStrokeWidth":"1px","WebkitTextStrokeColor":"#ffffff","MozTextStrokeColor":"#ffffff","textStrokeColor":"#ffffff"}}>OOPS!</p>
      <p className="text-center md:text-[2vw] text-[20px]">Something went wrong here</p>
      <div className="flex items-center justify-between md:text-[1.2vw] text-[12px] gap-5">
      {errorjson.map((t, i) => {return (
        <a className="flex items-center gap-2 flex-col md:p-[1vh_1vw] p-[8px] md:rounded-[1vw] rounded-[10px] shadow-[0_1px_4px_#0000004d,0_0_40px_#0000001a_inset] bg-[#ffffff1a] border border-[#ffffff80] backdrop-blur-[5px]" href={t.link} key={i}>
          <i className={`${t.icon} md:text-[2vw] text-[20px]`}></i>
          <p>{t.title}</p>
        </a>
      );})}
      </div>
    </div>
  );
}