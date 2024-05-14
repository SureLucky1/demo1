import React, { useState } from "react";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import MetaData from "./MataData";
import UpdateIcon from "@mui/icons-material/Update";
import useStyles from "./LoginFromStyle";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useTranslation } from 'react-i18next';
function UpdateProfile() {
  const { t } = useTranslation();
   const classes = useStyles();
   const [name, setName] = useState("");
   const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");


  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

function updateEmail(e) {
  e.preventDefault();
  const useremail = localStorage.getItem('useremail'); 
  fetch("http://localhost:5000/profile/update", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      useremail,
      gender,
      name,
    }),
  })      .then((res) => res.json())
  .then((data) => {
    window.localStorage.setItem("useremail", email);
    if (data.status == "ok") {
      alert("update successful");    

    }
    });
  fetch("http://localhost:5000/profile/update", {
    method: "PUT",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      useremail,
    }),
  })      .then((res) => res.json())
  .then((data) => {
    console.log(data, "userRegister");
    if (data.status == "ok") {
      alert("update successful");    
    }
    });
}

  return (
    <>
      <MetaData title="Update Profile" />

        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <UpdateIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              {t("updatePD")}
            </Typography>
            <TextField
              label={t("customerName")}
              variant="outlined"
              fullWidth
              className={`${classes.nameInput} ${classes.textField}`}
              value={name}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== ""
                  ? "Name must be at least 4 characters long."
                  : ""
              }
              onChange={handleNameChange}
            />

            <TextField
              label={t("email")}
              variant="outlined"
              fullWidth
              className={`${classes.emailInput} ${classes.textField}`}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />
            <TextField
              label={t("gender")}
              variant="outlined"
              fullWidth
              className={`${classes.emailInput} ${classes.textField}`}
              value={gender}
              onChange={handleGenderChange}
            />

            <div className={classes.root}>
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                className={classes.avatar2}
              />
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={classes.uploadAvatarButton}
                >
                  <p className={classes.uploadAvatarText}>{t("upload")}</p>
                </Button>
              </label>
            </div>

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              style={{ marginTop: "3rem" }}
              onClick={updateEmail}
            >
              {t("updateProfile")}
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

export default UpdateProfile;
