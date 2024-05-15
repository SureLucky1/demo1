import React, { useState} from "react";
import MetaData from "./MataData";
import { useParams } from "react-router-dom";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import LockResetIcon from "@mui/icons-material/LockReset";
import useStyles from "./LoginFromStyle";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ResetPassword() {
  const { t } = useTranslation();


const {token, useremail} = useParams();


  const classes = useStyles();
 
   const [password, setPassword] = useState("");
   const [confirmPassword, setconfirmPassword] = useState("");
   const [isValidPassword, setIsValidPassword] = useState(true);
   const handlePasswordChange = (event) => {
     setPassword(event.target.value);
     setIsValidPassword(event.target.value.length >= 1);
   };
   const handleConfirmPasswordChange = (event) => {
     setconfirmPassword(event.target.value);
   };

  function resetPassword(e) {

    e.preventDefault();
    fetch(`http://localhost:5000/reset-password/${useremail}/${token}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        password,
      }),
    })      .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status == "ok") {
        alert("update password successful");        
      }
      });
  }


   const isSignInDisabled = !(password && confirmPassword && isValidPassword) ;

  return (
    <>
      <MetaData title="Reset Password" />
        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <LockResetIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              {t("changePW")}
            </Typography>

            <TextField
              style={{ marginTop: "1rem" }}
              label= {t("PW")}
              variant="outlined"
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              error={!isValidPassword && password !== ""}
              helperText={
                !isValidPassword && password !== ""
                  ? "Password must be at least 8 characters."
                  : ""
              }
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField 
              label= {t("newPW")}
              variant="outlined"
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3.5rem" }}
              onClick={resetPassword}
            >
              {t("newPW")}
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Link to="/profile/" className={classes.createAccount}>
                {t("cancel")}
              </Link>
            </Typography>
          </form>
        </div>
      
    </>
  );
}

export default ResetPassword;
