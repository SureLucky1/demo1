import React from 'react'
import './legalization.css'
import { useTranslation } from 'react-i18next';

const Legalization = () => {
        const { t } = useTranslation();

  return (
    <div className='container'>
        <div className="legal-wrapper">
        <h5><strong>{t("company")} {t("companyName")}</strong></h5>
        <h5><strong>{t("location1")}</strong></h5>
        <p style={{color:"blue"}}>{t("distributionChannel1")}<br />

{t("distributionChannel2")}</p>

        <p>{t("p-1")}<span>{t("Lspan1")}</span> {t("p-2")}<br />

{t("p-3")}<span>{t("Lspan2")}</span><br />

{t("des")}<span>:ONEONEBOY, NAICI, DYU, DAFEI</span><br />

<span>{t("Lspan3")}</span>{t("Lspan4")}<br />

{t("Lspan5")}<span>{t("span6")}</span></p>

        <p>{t("p-4")}<br /> 

{t("p-5")}<br />

{t("Lspan7")}<span>{t("Lspan8")}</span></p>
<div className='spanGroup'>
        <span>{t("location2")}</span>
            <span style={{color:"blue"}}>WA/Signal:55967646</span>
            <span>{t("coordination")}</span>
            <span>{t("closing")}</span>
            <span>8/12/2015</span>
            </div>
        </div>
        </div>
  )
}

export default Legalization