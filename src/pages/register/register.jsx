import React, { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import { Button, FormGroup, Input, Col, Form, Row  } from 'reactstrap';
import './register.css'
import { useTranslation} from 'react-i18next';
const Register = () => {
  const [date, setDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { t } = useTranslation();
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
  const handleSubmit = (e) => {
      e.preventDefault();

      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          selectedTimezone,
          date,
          email,
          contactNumber,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    
  };

  return (
    <div>
        <Form >
        <h4>{t("newUser")}</h4>
    <Row>
      <Col md={6}>
        <FormGroup >
        <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />


          <Input
            id="exampleEmail"
            name="email"
            placeholder={t("email")}
            type="email"
            onChange={(e) => setEmail(e.target.value)} />
                    <Input
            id="examplePassword"
            name="password"
            placeholder={t("PW")}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
                    <Input
            id="examplePassword"
            name="password"
            placeholder={t("confirmPW")}
            type="password"
          />
                    <Input
            id="examplePassword"
            name="password"
            placeholder="氐"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
                    <Input
            id="examplePassword"
            name="password"
            placeholder={t("customContact")}
            type="text"
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </FormGroup>
      </Col>
    </Row>
    <Button type="submit" onClick={handleSubmit} style={{backgroundColor: "rgb(170, 170, 170)", color: "white"}}>
    {t("newUser")}
    </Button>
    <Button style={{backgroundColor: "white", color: "rgb(170, 170, 170)", textDecoration: "underline"}}>
    {t("back")}
    </Button>
  </Form>
  </div>
  )
}

export default Register