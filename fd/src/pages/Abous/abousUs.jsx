import React from 'react'
import './abousUs.css'
import { useTranslation, Trans } from 'react-i18next';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);    
    
  };
  return (
    <div className='container'>
        <div className="wrapper">
            <div className="first">
                            <h5>{t("aboutUsDesh51")}<span> {t("aboutUsDesspan1")}</span>{t("aboutUsDesh52")}<span> {t("aboutUsDesspan2")}</span></h5>
            <p>{t("aboutUsDesp1")}</p>
            </div>
            <div className="second">
                            <h5><strong>{t("servicePhilosophy")}</strong></h5>
            <p>{t("servieP")}</p>
<span>joyful life joyful ride</span><br />
<span>{t("commutionBetter")}</span>
<p>{t("joyfulP")}</p>
            </div>
<div className="third">
    <span>{t("thirdspan1")}</span>
    <span>{t("thirdspan2")}</span>
    <span>{t("thirdspan3")}</span>
    <span>{t("thirdspan4")}</span>
</div>
        </div>
    </div>
  )
}

export default AboutUs