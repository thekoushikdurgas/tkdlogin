import React from "react";

export default function Alert({alertactive}) {
  const [toast, settoast] = React.useState(false);
  const [toast1, settoast1] = React.useState(false);
  const alerts={
    'Error': {'class':"#dc3545",'icon':"tkd11-red-x-line",'header': 'Error','type':"danger"},
    'Success': {'class':"#28a745",'icon':"tkd11-success-green-check-mark",'header': 'Success','type':"success"},
    'Warning': {'class':"#ffc107",'icon':"tkd4-iconmonstr-warning-6",'header': 'Warning','type':"warning"},
  }
  React.useEffect(() => {
    if (alertactive[0]) {
      settoast(true);
      settoast1(true);
      setTimeout(() => {settoast(false)}, 5000);
      setTimeout(() => {settoast1(false)}, 5300);
    }
  }, [alertactive]);
  if (alertactive[0]) {
    return (
      <div className={`fixed md:top-[25px] top-[0] md:right-[25px] right-[0] z-[10000] overflow-hidden md:rounded-[0.5vw] rounded-[5px] md:p-[1vh_2vw] p-[15px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] translate-x-[200%] ${toast ? "translate-x-[0]" : ""}`}>
        <div className="flex items-center gap-5">
          <i className={`${alerts[alertactive[1]]['icon']} md:text-[3vw] text-[30px]`} style={{color:alerts[alertactive[1]]['class']}}></i>
          <div className="flex flex-col md:text-[1.5vw]" style={{color:alerts[alertactive[1]]['class']}}>
            <span className="text-bold">{alertactive[1]}</span>
            <span className="">{alertactive[2]}</span>
          </div>
        </div>
        <i className="tkd3-close absolute md:text-[1.5vw] cursor-pointer top-[15px] right-[15px]" onClick={()=>{settoast(false);setTimeout(() => {settoast1(false)}, 300);}}></i>
        <div className={`absolute bottom-0 left-0 md:h-[0.5vh] h-[3px] w-full bg-[#ddd] before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-full before:h-full ${toast1 ? "progressactive" : ""} progress${alerts[alertactive[1]]['type']}`}></div>
      </div>
    );
  }else{
    return(
      <></>
    );
  }
}
