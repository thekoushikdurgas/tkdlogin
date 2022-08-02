import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Alert from "./Alert";

export default function ForgotPassword() {
  const [alertactive, setalertactive] = useState([false,'','']);
  const [email,setemail]=useState('');
  const validateEmail = (email) => { return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); };
  const submitbutton = async (e) => {
    e.preventDefault(); 
    if (email === "") { setalertactive([true, 'Warning', 'Email is mandatory']); }
    else if (!validateEmail(email)) { setalertactive([true, 'Warning', 'Invalid Email']); }
    else {
        // const chatloginauth = await chatlogin(email, password);
        // if (chatloginauth) {
        //     window.location.assign(Cookies.get('priviousurl'));
            setalertactive([true, 'Success', 'Successfully login in']);
        // } else {
        //     setalertactive([true, 'Warning', 'Pl write correct deatails']);
        // }
    }
}
  return (
    <>
      <Alert alertactive={alertactive} />
      <div className="lurcard flex relative flex-col animate-[0.7s_ease_0s_1_normal_none_running_zoomin] select-none md:rounded-[1vw] rounded-[10px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] font-['Acme'] text-[20px] md:text-[2vw]">
        <p className='sticky top-[0] w-fit rounded-[0_0_10px_10px] md:rounded-[0_0_1vw_1vw] px-[10px] md:px-[1vw] z-[200] m-[0_auto] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-t-0 border-[#ffffff80] backdrop-blur-[5px]'>Forgot Your Password?</p>
        <div className="md:p-[1vh_1vw] p-[21px_14px] grid gap-5 justify-items-center">
            <p className="md:text-[1.2vw] text-[15px] text-center">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
            <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around">
                <input type="text" id="loginemail" name="loginemail" placeholder="eg. example@gmail.com" autoComplete="off" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" value={email}  onChange={(event)=>{setemail(event.target.value)}}/>
            </div>
            <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around overflow-hidden">
                <button onClick={(event)=>{submitbutton(event)}} className="active:scale-[0.9] tracking-[1px] uppercase w-fit xl:p-[2vh_2vw] p-[15px_30px] bg-backgroundcolor md:rounded-[2vw] rounded-[20px] shadow-[inset_5px_5px_15px_#96969680,inset_-5px_-5px_15px_#00000080,3px_3px_5px_#000000b3] leading-[0]">Reset</button>
            </div>
            <div className="text-center md:text-[1.2vw] text-[15px] leading-[0]">Not a member? <Link to="/registration" className='no-underline hover:underline font-medium'>Create an Account now!</Link></div>
            <div className="text-center md:text-[1.2vw] text-[15px] leading-[0]">Already have an account? <Link to="/login" className='no-underline hover:underline font-medium'>Signin now</Link></div>
        </div>
      </div>
    </>
  )
}
