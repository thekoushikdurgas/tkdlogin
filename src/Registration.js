/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const host = "https://thekoushikdurgasserver.herokuapp.com";
  const navigate = useNavigate();
  const [country, setcountry] = React.useState([]);
  const getcountry = async () => {
    const response = await fetch(`${host}/api/country`, {
      method: 'GET', headers: { 'Content-Type': 'application/json', }
    });
    const json = await response.json();
    setcountry(json);
  }
  const [alertactive, setalertactive] = useState([false, '', '']);
  const [render, setrender] = useState(true);
  const [slidePage, setslidePage] = useState(0);
  const [name, setname] = useState('');
  const [gender, setgender] = useState(null);
  const [email, setemail] = useState('');
  const [countryname, setcountryname] = useState('India');
  const [phoneex, setphoneex] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [year, setyear] = useState(2000);
  const [month, setmonth] = useState('Jan');
  const [day, setday] = useState(1);
  const [dayno, setdayno] = useState(null);
  const [username, setusername] = useState('');
  const [termscondition, settermscondition] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordstrength, setpasswordstrength] = useState(0);
  const [letterpa, setletterpa] = useState(false);
  const [capitalpa, setcapitalpa] = useState(false);
  const [numberpa, setnumberpa] = useState(false);
  const [lengthpa, setlengthpa] = useState(false);
  const [characterpa, setcharacterpa] = useState(false);
  const [password1, setpassword1] = useState('');
  const [logintogglePassword, setlogintogglePassword] = useState(true);
  const passwordindicator = [{ 'strength': 'Way too Weak ☹', 'inputcolor': '#f42323' }, { 'strength': 'Very Weak ☹', 'inputcolor': 'yellow' }, { 'strength': 'Weak ☹', 'inputcolor': '#f36d0a' }, { 'strength': 'Good ☺', 'inputcolor': '#85c2e0' }, { 'strength': 'Strong ☻', 'inputcolor': '#2bc253' }];
  var validpass = 0;
  const validateEmail = (email) => { return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); };
  const submitbutton = async (e, a) => {
    e.preventDefault();
    var slide = false;
    if (a === 1) {
      if (name === "") { setalertactive([true, 'Warning', 'First name is mandatory']); }
      else if (gender === "") { setalertactive([true, 'Warning', 'Gender is mandatory']); }
      else if (email === "") { setalertactive([true, 'Warning', 'Email is mandatory']); }
      else if (!validateEmail(email)) { setalertactive([true, 'Warning', 'Invalid Email']); }
      else if (countryname === "") { setalertactive([true, 'Warning', 'Country is mandatory']); }
      else if (phoneno === "") { setalertactive([true, 'Warning', 'Phone no. is mandatory']); }
      else { slide = true; }
    } else if (a === 2) {
      if (username === "") { setalertactive([true, 'Warning', 'Username is mandatory']); }
      else if (password === "") { setalertactive([true, 'Warning', 'Password is mandatory']); }
      else if (password !== password1) { setalertactive([true, 'Warning', 'Password and Confirm Password not same']); }
      else if (!termscondition) { setalertactive([true, 'Warning', 'Check Terms and Condition']); }
      else {
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ name, username, phone: phoneex + phoneno, picimg: 'https://raw.githubusercontent.com/thekoushikdurgas/TKDstroage/main/gender/' + gender + '.png', country: countryname, dof: day + '/' + month + '/' + year, gender, email, password })
        });
        const json = await response.json();
        if (json['success']) {
          localStorage.setItem('auth-token', json['authtoken']);
          localStorage.setItem('user-img', json['picimg']);
          localStorage.setItem('user-name', json['name']);
          localStorage.setItem('user-username', json['username']);
          setalertactive([true, 'Success', 'Successfully Resgister in']);
          navigate("/", { replace: true });
        } else {
          setalertactive([true, 'Warning', json]);
        }
      }
    }
    if (slide) { setslidePage(a) }
  }
  const changephone = (a) => { country.forEach(function (x) { if (x['name'] === a) { setphoneex(x['mcode']); } }) }
  const checkpassword = (val) => {
    validpass = -1;
    if (val.match(/[a-z]/g)) { setletterpa(true); validpass += 1; } else { setletterpa(false); }
    if (val.match(/[$@$$!%*#?&]/g)) { setcharacterpa(true); validpass += 1; } else { setcharacterpa(false); }
    if (val.match(/[A-Z]/g)) { setcapitalpa(true); validpass += 1; } else { setcapitalpa(false); }
    if (val.match(/[0-9]/g)) { setnumberpa(true); validpass += 1; } else { setnumberpa(false); }
    if (val.length >= 8) { setlengthpa(true); validpass += 1; } else { setlengthpa(false); }
    setpasswordstrength(validpass <= 0 ? 0 : validpass);
  }
  const changedayno = (a, b) => {
    if (b === 'Jan' || b === 'Mar' || b === 'May' || b === 'Jul' || b === 'Aug' || b === 'Oct' || b === 'Dec') { setdayno(31); }
    else if (b === 'Apr' || b === 'Jun' || b === 'Sep' || b === 'Nov') { setdayno(30); }
    else if (b === 'Feb') {
      if (a <= 1917) { if (a % 4 === 0) { setdayno(28); } else { setdayno(29); } }
      else if (a >= 1919) { if ((a % 400 === 0) || (a % 4 === 0 && a % 100 !== 0)) { setdayno(28); } else { setdayno(29); } }
      else { setdayno(14); }
    }
  }
  const getpassword = async (n) => {
    const response = await fetch(`${host}/api/password/` + n, {
      method: 'GET', headers: { 'Content-Type': 'application/json', }
    });
    const json = await response.json();
    setpassword(json[n]);
    setpassword1(json[n]);
    checkpassword(json[n]);
  }
  useEffect(() => {
    if (render) {
      async function fetchData() {
        if (country.length === 0) { getcountry(); }
        else {
          changephone(countryname);
          changedayno(year, month);
          checkpassword(password);
          await getpassword(16);
          setrender(false);
        }
      }
      fetchData();
    }
  }, [country, render, countryname, year, month, password])

  return (
    <>
      <Alert alertactive={alertactive} />
      <div className="lurcard md:w-[60%] w-full h-[auto] register flex gap-2 relative flex-col animate-[0.7s_ease_0s_1_normal_none_running_zoomin] select-none md:rounded-[1vw] rounded-[10px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] font-['Acme'] text-[20px] md:text-[2vw]">
        <p className='sticky top-[0] w-fit rounded-[0_0_10px_10px] md:rounded-[0_0_1vw_1vw] px-[10px] md:px-[1vw] z-[200] m-[0_auto] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-t-0 border-[#ffffff80] backdrop-blur-[5px]'>Create an Account!</p>
        <div className="w-full text-center">
          <div className="w-full overflow-hidden">
            <div className="flex w-[200%]">
              <div className="w-[50%] ease-in-out duration-[0.3s] transition-[margin-left] md:p-[2vh_2vw]" style={{ marginLeft: `-${slidePage * 25 >= 75 ? 75 : slidePage * 50}%` }}>
                <div className="grid gap-5">
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <input type="text" id="name" name="name" value={name} placeholder="Name eg. Koushik" autoComplete="off" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" onChange={(event) => { setname(event.target.value); setusername(event.target.value.replace(' ', '') + '123'); }} />
                  </div>
                  <div className="flex gap-5 m-auto">
                    <input type="radio" className='fixed w-0 opacity-0' name="genderre" id="male" value="male" onChange={() => { setgender('male') }} checked={gender === 'male' ? true : false} />
                    <label htmlFor="male" className={`md:p-[1vh_1vw] p-[7px] text-tkd2 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] cursor-pointer flex items-center justify-center gap-2${gender === 'male' ? ' bg-white text-tkd2' : ''}`}><i className="fad fa-male" /><span>male</span></label>
                    <input type="radio" className='fixed w-0 opacity-0' name="genderre" id="female" value="female" onChange={() => { setgender('female') }} checked={gender === 'female' ? true : false} />
                    <label htmlFor="female" className={`md:p-[1vh_1vw] p-[7px] text-tkd2 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] cursor-pointer flex items-center justify-center gap-2${gender === 'female' ? ' bg-white text-tkd2' : ''}`}><i className="fad fa-female" /><span>female</span></label>
                    <input type="radio" className='fixed w-0 opacity-0' name="genderre" id="others" value="others" onChange={() => { setgender('others') }} checked={gender === 'others' ? true : false} />
                    <label htmlFor="others" className={`md:p-[1vh_1vw] p-[7px] text-tkd2 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] cursor-pointer flex items-center justify-center gap-2${gender === 'others' ? ' bg-white text-tkd2' : ''}`}><i className="fad fa-transgender" /><span>others</span></label>
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <input type="text" id="reemail" name="reemail" value={email} placeholder="Email Address eg. example@gmail.com" autoComplete="off" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" onChange={(event) => { setemail(event.target.value) }} />
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto fieldselect">
                    <select name="myCountry" className="transition-all md:rounded-[1vw] rounded-[10px] duration-[0.3s] delay-[0] ease w-full font-medium h-full outline-[none] md:p-[1vh_1vw] p-[0_36px_0_15px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" value={countryname} onChange={(event) => { setcountryname(event.target.value); changephone(event.target.value); }}>
                      <option value={``} className="text-tkd2">Select Country</option>
                      {country.map((object, i) =>
                        <option value={object.name} key={i} className="text-tkd2">{object.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-stretch rounded-[10px] md:rounded-[1vw] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] m-auto">
                    <div className="flex"><span className="w-max md:p-[1vh_1vw] p-[0.375rem_0.75rem] flex items-center">{phoneex}</span></div>
                    <div className="field1 w-full md:h-[7vh] h-[45px] flex">
                      <input type="tel" name="rephone" className="w-full h-full md:p-[1vh_1vw] p-[0.375rem_0.75rem] border-l-2 border-tkd2 bg-[none]" id="rephone" autoComplete="off" placeholder="Phone" required value={phoneno} onChange={(event) => { setphoneno(event.target.value.replace(/[^\d]/, '')) }} style={{ background: 'none' }} />
                    </div>
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <input type="text" name="userna" id="userna" autoComplete="off" placeholder="Username eg. ZackGilkes" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" value={username} onChange={(event) => { setusername(event.target.value) }} />
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto overflow-hidden">
                    <button className="active:scale-[0.9] tracking-[1px] uppercase w-fit xl:p-[2vh_2vw] p-[15px_30px] bg-backgroundcolor md:rounded-[2vw] rounded-[20px] shadow-[inset_5px_5px_15px_#96969680,inset_-5px_-5px_15px_#00000080,3px_3px_5px_#000000b3] leading-[0]" onClick={(event) => { submitbutton(event, 1) }}>Next</button>
                  </div>
                </div>
              </div>
              <div className="w-[50%] ease-in-out duration-[0.3s] transition-[margin-left] md:p-[2vh_2vw]">
                <div className="grid gap-5">
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto fieldselect">
                    <select name="myYear" className="w-full transition-all md:rounded-[1vw] rounded-[10px] duration-[0.3s] delay-[0] ease font-medium h-full outline-[none] md:p-[1vh_1vw] p-[0_36px_0_15px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" style={{ borderRadius: '10px 0 0 10px' }} value={year} onChange={(event) => { setyear(event.target.value); changedayno(event.target.value, month); }}>
                      {(() => {
                        const rows = [];
                        for (let i = 1980; i < (new Date()).getFullYear() + 1; i++) {
                          rows.push(<option value={i} key={i} className="text-tkd2">{i}</option>);
                        }
                        return rows;
                      })()}
                    </select>
                    <select name="myMonth" className="transition-all md:rounded-[1vw] rounded-[10px] duration-[0.3s] delay-[0] ease w-full font-medium h-full outline-[none] md:p-[1vh_1vw] p-[0_36px_0_15px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" style={{ borderRadius: '0' }} value={month} onChange={(event) => { setmonth(event.target.value); changedayno(year, event.target.value); }}>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((object, i) =>
                        <option value={object} key={i} className="text-tkd2">{object}</option>
                      )}
                    </select>
                    <select name="myDay" className="transition-all md:rounded-[1vw] rounded-[10px] duration-[0.3s] delay-[0] ease w-full font-medium h-full outline-[none] md:p-[1vh_1vw] p-[0_36px_0_15px] bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" style={{ borderRadius: '0 10px 10px 0' }} value={day} onChange={(event) => { setday(event.target.value) }}>
                      {(() => {
                        const rows = [];
                        for (let i = 1; i < dayno + 1; i++) {
                          rows.push(<option value={i} key={i} className="text-tkd2">{i}</option>);
                        }
                        return rows;
                      })()}
                    </select>
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <input type={logintogglePassword ? 'password' : 'text'} name="password" id="password" autoComplete="off" placeholder="Password eg. Abc@1234" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" value={password} onChange={(event) => { setpassword(event.target.value); checkpassword(event.target.value); }} />
                    <i className={`absolute right-[10px] top-[22%] ${logintogglePassword ? 'tkd4-iconmonstr-eye-3' : 'tkd3-nc-sample-glyph_ui-eye-ban'}`} id="togglePassword" onClick={() => { setlogintogglePassword(!logintogglePassword) }} />
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <input type={logintogglePassword ? 'password' : 'text'} name="password1" id="password1" autoComplete="off" placeholder="Comfirm Password" required className="h-full w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]" value={password1} onChange={(event) => { setpassword1(event.target.value) }} />
                    <i className={`absolute right-[10px] top-[22%] ${logintogglePassword ? 'tkd4-iconmonstr-eye-3' : 'tkd3-nc-sample-glyph_ui-eye-ban'}`} id="togglePassword1" onClick={() => { setlogintogglePassword(!logintogglePassword) }} />
                  </div>
                  <div className={`md:w-full w-[95%] m-auto flex-wrap md:text-[1.2vw] text-[16px] flex flex-row justify-center gap-3 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw]`}>
                    <p><span style={{ color: passwordindicator[passwordstrength]['inputcolor'] }}><b>{passwordindicator[passwordstrength]['strength']}</b></span></p>
                    <p><span className={`${letterpa ? 'text-[#2bc253] before:content-["✔"]' : 'text-[#f42323] before:content-["✖"]'}`}><b>lowercase</b></span></p>
                    <p><span className={`${capitalpa ? 'text-[#2bc253] before:content-["✔"]' : 'text-[#f42323] before:content-["✖"]'}`}><b>uppercase</b></span></p>
                    <p><span className={`${numberpa ? 'text-[#2bc253] before:content-["✔"]' : 'text-[#f42323] before:content-["✖"]'}`}><b>number</b></span></p>
                    <p><span className={`${lengthpa ? 'text-[#2bc253] before:content-["✔"]' : 'text-[#f42323] before:content-["✖"]'}`}><b>8 chars</b></span></p>
                    <p><span className={`${characterpa ? 'text-[#2bc253] before:content-["✔"]' : 'text-[#f42323] before:content-["✖"]'}`}><b>special char</b></span></p>
                  </div>
                  <div className="md:text-[1.2vw] text-[16px] md:w-full w-[95%] m-auto h-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] rounded-[10px] md:rounded-[1vw] md:p-[1vh_1vw] p-[0.375rem_0.75rem]">
                    <label className="tkdcheckbox flex items-center justify-around">
                      <div className='relative'>
                        <input className='w-[21px] h-[21px] md:w-[2vw] md:h-[2vw] block appearance-none relative bg-white cursor-pointer md:rounded-[0.4vw] rounded-[4px]' type="checkbox" name="rememberlo" id="rememberlo" checked={termscondition} onChange={() => { settermscondition(!termscondition); }} />
                        <svg className='w-[21px] h-[21px] md:w-[2vw] md:h-[2vw] block fill-[none] stroke-[2px] stroke-tkd2 absolute top-0' viewBox="0 0 21 21"><path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path></svg>
                      </div>
                    </label>
                    <p>By clicking Sign Up, you agree to our <Link to='/' target="_blank" className='no-underline hover:underline font-medium'>Terms</Link>, <Link to='/' target="_blank" className='no-underline hover:underline font-medium'>Data Policy</Link>and <Link to='/' target="_blank" className='no-underline hover:underline font-medium'>Cookie Policy</Link>. You may receive SMS notifications from us and can opt out at any time.</p>
                  </div>
                </div>
                <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto" style={{ margin: '6px 0 0' }}>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <button className="active:scale-[0.9] tracking-[1px] uppercase w-fit xl:p-[2vh_2vw] p-[15px_30px] bg-backgroundcolor md:rounded-[2vw] rounded-[20px] shadow-[inset_5px_5px_15px_#96969680,inset_-5px_-5px_15px_#00000080,3px_3px_5px_#000000b3] leading-[0]" onClick={(event) => { event.preventDefault(); setslidePage(0) }}>Previous</button>
                  </div>
                  <div className="md:w-full w-[95%] md:h-[7vh] h-[45px] relative flex items-center justify-around m-auto">
                    <button className="active:scale-[0.9] tracking-[1px] uppercase w-fit xl:p-[2vh_2vw] p-[15px_30px] bg-backgroundcolor md:rounded-[2vw] rounded-[20px] shadow-[inset_5px_5px_15px_#96969680,inset_-5px_-5px_15px_#00000080,3px_3px_5px_#000000b3] leading-[0]" onClick={(event) => { submitbutton(event, 2) }}>Registration</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-[1.2vw] text-[15px]">Already have an account? <Link className='no-underline hover:underline font-medium' to="/login">Signin now</Link>or<p>Please fill in this form to create an account.</p></div>
      </div>
    </>
  )
}