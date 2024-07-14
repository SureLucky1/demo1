import React, { useState, useContext, useEffect} from 'react';
import {CopyrightOutlined, GlobalOutlined, ShoppingCartOutlined, SolutionOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import ShowContext from '../..';
import { Link  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import "./header.css"
import { useTranslation } from 'react-i18next';
import InputModal from './Modal/Modal2';
import { moneyData } from '../../data';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import { useDispatch } from 'react-redux';

const UpperHeader = ({ handleInputChange, clickSearch, query, handleSearch }) => {
  const { t, i18n } = useTranslation();
const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  
};
const {Lan, setLan, moneyIndex, setMoney, setCurrency, rightsidebarWidth, setRightSideBarWidth, leftsidebardisplay, setLeftSideBarDisplay, rightsidebardisplay, setRightSideBarDisplay, chooseRecord, setChooseRecord, login, setLogin} = useContext(ShowContext);
const [Log, setLog] = useState("登入");
const [personalInfo, setPersonalInfo] = useState("個人資料");
useEffect(()=>{
  if(Lan === "繁體中文"){
    setLog("登入");
    setPersonalInfo("個人資料");
  }else if(Lan === "简体中文"){
    setLog("登录");
    setPersonalInfo("个人资料");
  }else if(Lan === "English"){
    setLog("Log In");
    setPersonalInfo("Info");
  }
}, [Lan])
    const [dropdownOpen, setDropdownOpen] = useState(false);
const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const [dropdownOpenLan, setDropdownOpenLan] = useState(false);
    const toggleLan = () => setDropdownOpenLan((prevState) => !prevState);
    const showSidebarLeft = () => {
      const sidebarLeft = document.querySelector('.sidebar-left');
      sidebarLeft.style.display = leftsidebardisplay;
      if(leftsidebardisplay =="none"){
        setLeftSideBarDisplay("flex");
      }else if(leftsidebardisplay == 'flex'){
        setLeftSideBarDisplay("none")
      }
    }      

    const inputToggle = (e) => {
      if (e.target.classList.contains("large-input")) {
        document.getElementById("input").classList.remove("large-input");
        document.getElementById("input").classList.add("large-input-set");
      }
    };
  const closeInput = () =>{
    if(document.getElementById("input").classList.contains("large-input-set")){
              document.getElementById("input").classList.add("large-input");
    document.getElementById("input").classList.remove("large-input-set");
    }

    }


    const setInput = () => {
      if(showModal === false){
        setShowModal(true)
      }else{
        setShowModal(false)
      }
    };
    const setInputClose = () => {
      setShowModal(false);
    };
    useEffect(()=>{
      dispatch(setCurrency(moneyData[moneyIndex].currency))
    }, [moneyIndex])
    const showSidebarRight = () => {
        const sidebarRight = document.querySelector('.sidebar-right');
        sidebarRight.style.display = rightsidebardisplay;
        sidebarRight.style.width = rightsidebarWidth;
        if(rightsidebardisplay =="none"){
          setRightSideBarDisplay("flex");
          setRightSideBarWidth("50%");
        }else if(rightsidebardisplay == 'flex'){
          setRightSideBarDisplay("none")
          setRightSideBarWidth("0");
        }
    }

    
  return (
    <nav className='nav1'>

<ul className='sidebar-right' style={{width: rightsidebarWidth, display: rightsidebardisplay}}>
    <li className="" id=""><Link
    className='link-item'
                    to="/"
                  ><HomeOutlined />{t("home")}</Link></li>
    <li className="" id=""><Link
    className='link-item'
                    to="checkout/"
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><ShoppingCartOutlined />{t("cart")}</Link></li>
<li className="me-1" id=""><GlobalOutlined />{Lan}
<div>
      <ul className="dropdown-menu">
    <li onClick={()=>{setLan('繁體中文'); changeLanguage("ch")}}>繁體中文</li>
    <li onClick={()=>{setLan('简体中文'); changeLanguage("simch")}}>简体中文</li>
    <li onClick={()=>{setLan('English'); changeLanguage("eng")}}>English</li>
</ul>
      </div>
</li>
    <li className="me-2" id="">
    <CopyrightOutlined />{moneyData[moneyIndex].money}
      <div>
      <ul className="dropdown-menu">
  <li onClick={() => {setMoney(0)}}>AED</li>
  <li onClick={() => {setMoney(1)}}>AFN</li>
  <li onClick={() => {setMoney(2)}}>AMD</li>
  <li onClick={() => {setMoney(3)}}>ANG</li>
  <li onClick={() => {setMoney(4)}}>AOA</li>
  <li onClick={() => {setMoney(5)}}>ARS</li>
  <li onClick={() => {setMoney(6)}}>AUD</li>
  <li onClick={() => {setMoney(7)}}>AWG</li>
  <li onClick={() => {setMoney(8)}}>AZN</li>
  <li onClick={() => {setMoney(9)}}>BAM</li>
  <li onClick={() => {setMoney(10)}}>BBD</li>
  <li onClick={() => {setMoney(11)}}>BDT</li>
  <li onClick={() => {setMoney(12)}}>BGN</li>
  <li onClick={() => {setMoney(13)}}>BHD</li>
  <li onClick={() => {setMoney(14)}}>BIF</li>
  <li onClick={() => {setMoney(15)}}>BMD</li>
  <li onClick={() => {setMoney(16)}}>BOB</li>
  <li onClick={() => {setMoney(17)}}>BRL</li>
  <li onClick={() => {setMoney(18)}}>BSD</li>
  <li onClick={() => {setMoney(19)}}>BTC</li>
  <li onClick={() => {setMoney(20)}}>BTN</li>
  <li onClick={() => {setMoney(21)}}>BWP</li>
  <li onClick={() => {setMoney(22)}}>BYN</li>
  <li onClick={() => {setMoney(23)}}>BYR</li>
  <li onClick={() => {setMoney(24)}}>BZD</li>
  <li onClick={() => {setMoney(25)}}>CAD</li>
  <li onClick={() => {setMoney(26)}}>CDF</li>
  <li onClick={() => {setMoney(27)}}>CHF</li>
  <li onClick={() => {setMoney(28)}}>CLF</li>
  <li onClick={() => {setMoney(29)}}>CLP</li>
  <li onClick={() => {setMoney(30)}}>CNY</li>
  <li onClick={() => {setMoney(31)}}>COP</li>
  <li onClick={() => {setMoney(32)}}>CRC</li>
  <li onClick={() => {setMoney(33)}}>CUC</li>
  <li onClick={() => {setMoney(34)}}>CUP</li>
  <li onClick={() => {setMoney(35)}}>CVE</li>
  <li onClick={() => {setMoney(36)}}>CZK</li>
  <li onClick={() => {setMoney(37)}}>DJF</li>
  <li onClick={() => {setMoney(38)}}>DKK</li>
  <li onClick={() => {setMoney(39)}}>DOP</li>
  <li onClick={() => {setMoney(40)}}>DZD</li>
  <li onClick={() => {setMoney(41)}}>EGP</li>
  <li onClick={() => {setMoney(42)}}>ERN</li>
  <li onClick={() => {setMoney(43)}}>ETB</li>
  <li onClick={() => {setMoney(44)}}>EUR</li>
  <li onClick={() => {setMoney(45)}}>FJD</li>
  <li onClick={() => {setMoney(46)}}>FKP</li>
  <li onClick={() => {setMoney(47)}}>GBP</li>
  <li onClick={() => {setMoney(48)}}>GEL</li>
  <li onClick={() => {setMoney(49)}}>GGP</li>
  <li onClick={() => {setMoney(50)}}>GHS</li>
  <li onClick={() => {setMoney(51)}}>GIP</li>
  <li onClick={() => {setMoney(52)}}>GMD</li>
  <li onClick={() => {setMoney(53)}}>CNF</li>
  <li onClick={() => {setMoney(54)}}>GTQ</li>
  <li onClick={() => {setMoney(55)}}>GYD</li>
  <li onClick={() => {setMoney(56)}}>HKD</li>
  <li onClick={() => {setMoney(57)}}>HNL</li>
  <li onClick={() => {setMoney(58)}}>HRK</li>
  <li onClick={() => {setMoney(59)}}>HTG</li>
  <li onClick={() => {setMoney(60)}}>HUF</li>
</ ul>



      </div>
</li>
    <li className="" id=""><Link
    className='link-item'
                    to="register/"
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><SolutionOutlined />{t("signUp")}</Link></li>
    <li className="" id=""><Link
    className='link-item'
    to={login? "profile/": "login/"}
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><LockOutlined />{login? personalInfo : Log}</Link></li>
</ul>



<ul className='main' >
<li className="menu-button left" onClick={showSidebarLeft} id="">
        <span className="material-symbols-outlined left">
        menu
</span>
</li>
<div className='upper' onBlur={setInputClose}>
    <ul >
    <li className="hideOnMobile one" id=""><Dropdown isOpen={dropdownOpenLan} toggle={toggleLan}>
      <DropdownToggle caret size="lg">
      <GlobalOutlined />{Lan}
      </DropdownToggle>
      <DropdownMenu style={{position:"relative", right:"150px"}}>
        <DropdownItem onClick={()=>{setLan('繁體中文'); changeLanguage("ch")}}>繁體中文</DropdownItem>
        <DropdownItem onClick={()=>{setLan('简体中文'); changeLanguage("simch")}}>简体中文</DropdownItem>
        <DropdownItem onClick={()=>{setLan('English'); changeLanguage("eng")}}>English</DropdownItem>
      </DropdownMenu>
    </Dropdown></li>

    <li className="hideOnMobile two" id=""><Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="lg">
      <CopyrightOutlined />{moneyData[moneyIndex].money}
      </DropdownToggle>
      <DropdownMenu>
  <DropdownItem onClick={() => {setMoney(0)}}>AED</DropdownItem>
  <DropdownItem onClick={() => {setMoney(1)}}>AFN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(2)}}>AMD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(3)}}>ANG</DropdownItem>
  <DropdownItem onClick={() => {setMoney(4)}}>AOA</DropdownItem>
  <DropdownItem onClick={() => {setMoney(5)}}>ARS</DropdownItem>
  <DropdownItem onClick={() => {setMoney(6)}}>AUD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(7)}}>AWG</DropdownItem>
  <DropdownItem onClick={() => {setMoney(8)}}>AZN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(9)}}>BAM</DropdownItem>
  <DropdownItem onClick={() => {setMoney(10)}}>BBD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(11)}}>BDT</DropdownItem>
  <DropdownItem onClick={() => {setMoney(12)}}>BGN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(13)}}>BHD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(14)}}>BIF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(15)}}>BMD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(16)}}>BOB</DropdownItem>
  <DropdownItem onClick={() => {setMoney(17)}}>BRL</DropdownItem>
  <DropdownItem onClick={() => {setMoney(18)}}>BSD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(19)}}>BTC</DropdownItem>
  <DropdownItem onClick={() => {setMoney(20)}}>BTN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(21)}}>BWP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(22)}}>BYN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(23)}}>BYR</DropdownItem>
  <DropdownItem onClick={() => {setMoney(24)}}>BZD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(25)}}>CAD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(26)}}>CDF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(27)}}>CHF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(28)}}>CLF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(29)}}>CLP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(30)}}>CNY</DropdownItem>
  <DropdownItem onClick={() => {setMoney(31)}}>COP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(32)}}>CRC</DropdownItem>
  <DropdownItem onClick={() => {setMoney(33)}}>CUC</DropdownItem>
  <DropdownItem onClick={() => {setMoney(34)}}>CUP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(35)}}>CVE</DropdownItem>
  <DropdownItem onClick={() => {setMoney(36)}}>CZK</DropdownItem>
  <DropdownItem onClick={() => {setMoney(37)}}>DJF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(38)}}>DKK</DropdownItem>
  <DropdownItem onClick={() => {setMoney(39)}}>DOP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(40)}}>DZD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(41)}}>EGP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(42)}}>ERN</DropdownItem>
  <DropdownItem onClick={() => {setMoney(43)}}>ETB</DropdownItem>
  <DropdownItem onClick={() => {setMoney(44)}}>EUR</DropdownItem>
  <DropdownItem onClick={() => {setMoney(45)}}>FJD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(46)}}>FKP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(47)}}>GBP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(48)}}>GEL</DropdownItem>
  <DropdownItem onClick={() => {setMoney(49)}}>GGP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(50)}}>GHS</DropdownItem>
  <DropdownItem onClick={() => {setMoney(51)}}>GIP</DropdownItem>
  <DropdownItem onClick={() => {setMoney(52)}}>GMD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(53)}}>CNF</DropdownItem>
  <DropdownItem onClick={() => {setMoney(54)}}>GTQ</DropdownItem>
  <DropdownItem onClick={() => {setMoney(55)}}>GYD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(56)}}>HKD</DropdownItem>
  <DropdownItem onClick={() => {setMoney(57)}}>HNL</DropdownItem>
  <DropdownItem onClick={() => {setMoney(58)}}>HRK</DropdownItem>
  <DropdownItem onClick={() => {setMoney(59)}}>HTG</DropdownItem>
  <DropdownItem onClick={() => {setMoney(60)}}>HUF</DropdownItem>
</DropdownMenu>


    </Dropdown></li> 
    <li className="hideOnMobile three" id="" onClick={inputToggle} onBlur={closeInput} style={{cursor:"pointer"}}>
      <FontAwesomeIcon onClick={setInput} icon={faMagnifyingGlass} />
      <input 
      id="input"
      className='large-input'
      onChange={handleInputChange}
      onKeyUp={handleSearch}
      value={query} 
      onBlur={setInputClose} 
      type='text'
      />
      <InputModal
            handleInputChange={handleInputChange}
            value={query} 
            handleSearch={handleSearch}
            onBlur={setInputClose} 
            showModal={showModal}
            setShowModal={setShowModal}
            clickSearch={clickSearch}
      />
      
      <span onClick={clickSearch}>{t("search")}</span></li>
    </ul>
    <h1><Link to="/">{t("shopName")}</Link></h1>
<ul>
    <li className="hideOnMobile" id=""><Link
    className='link-item'
                    to="/"
                  ><HomeOutlined />{t("home")}</Link></li>
    <li className="hideOnMobile" id=""><Link
    className='link-item'
                    to="checkout/"
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><ShoppingCartOutlined />{t("cart")}</Link></li>
    <li className="hideOnMobile" id=""><Link
    className='link-item'
                    to="register/"
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><SolutionOutlined />{t("signUp")}</Link></li>
    <li className="hideOnMobile" id=""><Link
    className='link-item'
    to={login? "profile/": "login/"}
                    style={{ textDecoration: "none", color: "#fff" }}
                  ><LockOutlined />{login? personalInfo : Log}</Link></li>
    </ul>
</div>
 <li className="menu-button right" onClick={showSidebarRight} id="">
        <span className="material-symbols-outlined right">
            steppers
</span>
</li>
</ul>
    </nav>
  )
}

export default UpperHeader