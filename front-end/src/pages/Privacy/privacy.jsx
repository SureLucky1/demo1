import React from 'react'
import './privacy.css'
import { useTranslation } from 'react-i18next';
const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className='container'>
        <div className="wrapper">
          <h1>{t("privacyPolicy")}</h1>
          <p>{t("welcome")}</p>
            
            <div className="first">
                            <h5><strong>{t("scope")}</strong></h5>
            <p>{t("scopeDes1")}<br />
{t("scopeDes2")}</p>
            </div>

            <div className="second">
                            <h5><strong>{t("useGuideline")}</strong></h5>
            <p>{t("guide1")}<br />
            {t("guide2")}<br />
            {t("guide3")}<br />
            {t("guide4")}<br />
            {t("guide5")}<br />
            {t("guide6")}<br />
            {t("guide7")}<br />
            {t("guide8")}</p>
<span>joyful life joyful ride</span>
<span>{t("privacyPolicyBetterFuture")}</span>
<p>{t("operation")}</p>
            </div>

<div className="third">
<h5><strong>{t("protection")}</strong></h5>
<p>{t("protectionP-1")}<br />
{t("protectionP-2")}<br />
{t("protectionP-3")}<br />
{t("protectionP-4")}</p>
</div>

<div className="fourth">
<h5><strong>{t("externalLink")}</strong></h5>
<p>{t("internetConnection1")}<br />
{t("internetConnection2")}</p>
</div>

<div className="fifth">
<h5><strong>{t("thirdPTY")}</strong></h5>
<p>{t("notforsell1")}<br />
{t("notforsell2")}</p>

<span>{t("exception")}</span>

<p>{t("writtenConsent")}<br />
{t("legalRequirement")}<br />
{t("preventDanger")}<br />
{t("corporation1")}<br />
{t("corporation2")}<br />
{t("violation1")}<br />
{t("violation2")}<br />
{t("interest")}<br />
{t("collection")}</p>
</div>

<div className="sixth">
<h5><strong>{t("cookies")}</strong></h5>
<p>{t("useofcookies")}<br />
{t("notAccept")}</p>
</div>

<div className="seventh">
<h5><strong>{t("privacyCorrection")}</strong></h5>
<p>{t("demandCorrection")}</p>
</div>

<div className="eigth">
<h5><strong>{t("refund")}</strong></h5>
<p>{t("refundCon")}</p>
</div>

        </div>
    </div>
  )
}

export default Privacy