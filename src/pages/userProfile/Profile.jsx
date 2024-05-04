import React, { useEffect, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ExitToApp as LogoutIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Profile.css";
import ShowContext from "../../index";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [mynumber, setMyNumber] = useState('');
const [myGender, setMyGender] = useState('')
const [myName, setMyName] = useState('')
const [date, setDate] = useState('')
  const navigate = useNavigate();
  const { setChooseRecord, setLogin} = useContext(ShowContext);
  const mytoken = localStorage.getItem('token');
  
  const useremail = localStorage.getItem('useremail');
  useEffect(()=>{

      fetch(`http://localhost:5000/profile?token=${mytoken}&useremail=${useremail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setMyNumber(data.data.contactNumber);
        setToken(mytoken);
          setEmail(data.data.email);
          setMyName(data.data.name);
          setDate(data.data.date)
          setMyGender(data.data.gender);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
    
  }, [useremail])

  function handleLogout(e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("useremail");
    window.localStorage.removeItem("cartItems");
    setChooseRecord([]);
    setLogin(false);
    navigate("/login");
}

  function getInfo(e) {
    e.preventDefault();
          fetch(`http://localhost:5000/getP/${localStorage.getItem('useremail')}`, {
            method: "GET",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setChooseRecord(data);
              navigate("/order/");
            });
}


  return (
    <div className="rootProfile">
      <div className="header-root">
        <Typography variant="h5" component="h1" className="headingProfile">
        {t("hi")}, <strong>{myName}</strong> !
        </Typography>

        <Typography variant="body2" className="greeting">
        {t("welcomeBack")}
        </Typography>
      </div>

      <div className="profileConatiner">
        <div className="leftCotainer">
          <h4
          
            className="profileHeadingLeft"
          >
           {t("overview")}
          </h4>
          <div className="profileSection">
            <Avatar
              
             
              className="profileAvatar"
            />
            <div className="leftDetails">
              <Typography className="profileText">
                <h5 className="profileSubHeading">{t("customerName")} : <strong>{myName}</strong></h5>
 
              </Typography>
              <Typography className="profileText">
                <h5 className="profileSubHeading">{t("email")} : <strong>{email}</strong></h5>
          
              </Typography>
              <Typography className="profileText">
                <h5 className="profileSubHeading">{t("registerationDay")} : <strong>{date}</strong></h5>{" "}

              </Typography>
            </div>
          </div>

          <div className="myOrder">
            <Typography variant="h4" component="h1" className="profileHeading">
            {t("shopRecord")}
            </Typography>
            <Link
            onClick={getInfo}
              to="/order/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button  variant="contained" className="ordersButton">
              {t("check")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="rightConatiner">
          <div className="righHeadings">
            <Typography variant="h4" component="h1" className="profileHeading">
            {t("personalInfo")}
            </Typography>
            <Typography className="profileText2">
            {t("text2")}
            </Typography>
          </div>
          <div className="profileDetials">
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
                
              >
                {t("details")}
              </Typography>
              <Typography className="profileText"></Typography>
              <Typography className="profileText">{t("email")}: <strong>{email}</strong></Typography>
              <Typography className="profileText"> {t("Phone")}: <strong>{mynumber}</strong></Typography>
              <Typography className="profileText">{t("gender")}: <strong>{myGender}</strong></Typography>
            </div>

            <Link to="/profile/update" style={{ textDecoration: "none" }}>
              <Button variant="contained" className="profileButton">
              {t("edit")}
              </Button>
            </Link>
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
                style={{ marginTop: "1.5rem" }}
              >
                {t("loginDetail")}
              </Typography>
              <Typography className="profileSubHeading">{t("email")}</Typography>
              <Typography className="profileText"><strong>{email}</strong></Typography>

              <Typography
                className="profileSubHeading"
                style={{ marginTop: "10px" }}
              >
                {t("PW")}
              </Typography>
              <Typography className="profileSubHeading">
                *************
              </Typography>
            </div>
            <Link
              to={`/reset-password/${email}/${token}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" className="profileButton">
              {t("updatePW")}
              </Button>
            </Link>

            <div className="mangeAccount">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
              >
                {t("logoutAll")}
              </Typography>

              <p className="profileText3">
              {t("text")}
              </p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="profileButton"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              {t("logout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
