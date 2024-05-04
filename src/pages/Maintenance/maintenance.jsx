import React from 'react'
import "./maintenance.css"
import { useTranslation } from 'react-i18next';
const Maintenance = () => {
  const { t} = useTranslation();

  return (
    <div><div className="maintenance-wrapper">
        <div>
            <h4><strong>{t("maintenancePolicy")}</strong></h4>
<p>{t("maintenanceDes1")}</p>
        <p>{t("maintenanceDes2")}</p>
        <p>{t("maintenanceDes3")}</p>
        <span>{t("span1")}</span>
        <span>{t("span2")}</span>
        <span>{t("span3")}</span>
        <span>{t("span4")}</span>
        <span>{t("span5")}</span>
        <span>{t("span6")}</span>
        <span>{t("span7")}</span>
        
        </div>
        <div>
            <h4><strong>{t("batteryMaintenance")}</strong></h4>
<p>{t("battery1")}</p>
<p>{t("battery2")}</p>
<p>{t("battery3")}<br />
{t("battery4")}</p>
        </div>
        <div>
            <h4><strong>{t("tips")}</strong></h4>
<p>{t("tip1")}</p>
<p>{t("tip2")}</p>
        </div>

        <p>{t("expire")}</p>
        </div></div>
  )
}

export default Maintenance