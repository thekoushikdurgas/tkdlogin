/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Alert from "./Alert";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
    const host = "https://thekoushikdurgasserver.herokuapp.com";
    const [alertactive, setalertactive] = useState([false, '', '']);
    const [render, setrender] = useState(true);
    const [logintogglePassword, setlogintogglePassword] = useState(true);
    const [email, setemail] = useState('');
    const [emailclass, setemailclass] = useState(false);
    const [emailerror, setemailerror] = useState('');
    const [password, setpassword] = useState('');
    const [passworderror, setpassworderror] = useState('');
    const [passwordclass, setpasswordclass] = useState(false);
    const chatlogin = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ email, password }) });
        const json = await response.json();
        if (json['success']) {
            Cookies.set('userauthtoken', json.authtoken, { path: '', domain: '.thekoushikdurgas.in' });
            Cookies.set('useremail', json.email, { path: '', domain: '.thekoushikdurgas.in' });
        }
        return json['success'];
    }
    const validateEmail = (email) => { return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); };
    const valemail = (e) => { setemail(e); if (validateEmail(e)) { setemailclass(true); setemailerror(''); } else if (e === '') { setemailerror('Email is mandatory'); setemailclass(false); } else { setemailerror('Invalid Email'); setemailclass(false); } }
    const valpassword = (e) => { setpassword(e); if (e === '') { setpassworderror('Password is mandatory'); setpasswordclass(false); } else { setpassworderror(''); setpasswordclass(true); } }
    const submitbutton = async (e) => {
        e.preventDefault(); valemail(email); valpassword(password);
        if (!emailclass) { setalertactive([true, 'Warning', emailerror]); }
        else if (!passwordclass) { setalertactive([true, 'Warning', passworderror]); }
        else {
            const chatloginauth = await chatlogin(email, password);
            if (chatloginauth) {
                window.location.assign(Cookies.get('priviousurl') || 'http://thekoushikdurgas.in/');
                setalertactive([true, 'Success', 'Successfully login in']);
            } else {
                setalertactive([true, 'Warning', 'Pl write correct deatails']);
            }
        }
    }
    useEffect(() => {
        if (render) {
            // valemail(email);
            // valpassword(password);
            setrender(false);
        }
    }, [email, password, render])
    return (
        <>
            <Alert alertactive={alertactive} />
            <div className="flex relative flex-col animate-[0.7s_ease_0s_1_normal_none_running_zoomin] select-none md:rounded-[1vw] rounded-[10px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] font-['Acme'] text-[20px] md:text-[2vw]">
                <p className='sticky top-[0] w-fit rounded-[0_0_10px_10px] md:rounded-[0_0_1vw_1vw] px-[10px] md:px-[1vw] z-[200] m-[0_auto] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-t-0 border-[#ffffff80] backdrop-blur-[5px]'>Welcome Back!</p>
                <div className="md:p-[1vh_1vw] p-[21px_14px] grid gap-5">
                    <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around">
                        <input type="text" name="loginemail" value={email} placeholder="Email Address" autoComplete="off" required className={`h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem] ${emailclass ? 'border-[#34f04a]' : 'border-[red]'}`} onChange={(event) => { valemail(event.target.value) }} />
                    </div>
                    <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around">
                        <input type={logintogglePassword ? 'password' : 'text'} name="loginpassword" value={password} placeholder="Password" autoComplete="off" required className={`h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem] ${passwordclass ? 'border-[#34f04a]' : 'border-[red]'}`} onChange={(event) => { valpassword(event.target.value) }} />
                        <i className={`absolute right-[10px] top-[22%] ${logintogglePassword ? 'tkd4-iconmonstr-eye-3' : 'tkd3-nc-sample-glyph_ui-eye-ban'}`} id="logintogglePassword" onClick={() => { setlogintogglePassword(!logintogglePassword) }}></i>
                    </div>
                    <div className="content1 flex justify-evenly items-center md:flex-row flex-col md:text-[1.3vw] text-[15px]">
                        <div className="remember w-1/2">
                            <label className="tkdcheckbox flex items-center justify-around">
                                <div className='relative'>
                                    <input className='w-[21px] h-[21px] md:w-[2vw] md:h-[2vw] block appearance-none relative bg-white cursor-pointer md:rounded-[0.4vw] rounded-[4px]' type="checkbox" name="rememberlo" id="rememberlo" />
                                    <svg className='w-[21px] h-[21px] md:w-[2vw] md:h-[2vw] block fill-[none] stroke-[2px] stroke-tkd2 absolute top-0' viewBox="0 0 21 21"><path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path></svg>
                                </div>
                                <span>Remember me</span>
                            </label>
                        </div>
                        <div className="text-center"><Link to="/forgot" className='no-underline hover:underline font-medium'>Forgot password?</Link></div>
                    </div>
                    <div className="social-icon">
                        <div className="flex justify-around">
                            <button className="scale-1 hover:scale-[1.3]"><i className="fab fa-google"></i></button>
                            <button className="scale-1 hover:scale-[1.3]"><i className="fab fa-facebook"></i></button>
                            <button className="scale-1 hover:scale-[1.3]"><i className="fab fa-github"></i></button>
                        </div>
                    </div>
                    <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around">
                        <button onClick={(event) => { submitbutton(event); }} className="active:scale-[0.9] tracking-[1px] uppercase w-fit xl:p-[2vh_2vw] p-[15px_30px] bg-backgroundcolor md:rounded-[2vw] rounded-[20px] shadow-[inset_5px_5px_15px_#96969680,inset_-5px_-5px_15px_#00000080,3px_3px_5px_#000000b3] leading-[0]">Login</button>
                    </div>
                    <div className="text-center md:text-[1.2vw] text-[15px]">Not a member? <Link to="/registration" className='no-underline hover:underline font-medium'>Create an Account now!</Link></div>
                </div>
            </div>
        </>
    )
}