import React, { useContext } from 'react'
import MyCarousel from '../carousel/carousel'
import ShowContext from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faMagnifyingGlass, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import './main.css'
const Main = ({ clickSearch, handleSearch, sortAscending, myinfo, query, handleInputChange, handleClick}) => {
    const { selectedCategory} = useContext(ShowContext);
        const showSidebar = () => {
            const sidebar = document.querySelector('.leftSidebar');
                sidebar.style.display = "flex";
                sidebar.style.width = '60vw';
    }
    const { t} = useTranslation();
  return (
    <div className='body'>
        <MyCarousel />

        <section className='bigScreen'>
            <div className='bigScreen-wrapper'>
                            <div className='left'>
                                <div>
                <h1>{t("product")}</h1>
                </div>
                <div>
                <select onChange={handleClick}>
        <option value="All">{t("outdoor")}</option>
        <option value="Electric Mobility">{t("electricMobility")}</option>
        <option value="Manual Bicycle">{t("manualBicycle")}</option>
        <option value="Accessories">{t("accessories")}</option>
      </select>
          </div>
            </div>
            <div className='right'>
<div className='info' >
    <select onChange={sortAscending}>
    <option value="Asc">{t("sortbylower")}</option>
    <option value="Desc">{t("sortbyhigher")}</option>
    </select>
<div className='search'>
    <input className="type" onKeyUp={handleSearch} onChange={handleInputChange}
      value={query} placeholder={t("enter")}/>
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={clickSearch} className='searchGlass'/>
</div>
</div>
<div className='productGroup'>
{(selectedCategory) && <div className='productGroup'> {myinfo} </div> }


</div>
            </div>
            </div>

        </section>

        <section className='smallScreen'> 
<div className='info' >
    <select onChange={sortAscending}>
    <option value="Asc">{t("sortbylower")}</option>
    <option value="Desc">{t("sortbyhigher")}</option>
    </select>
<div>

    <button 
    className="leftSidebar2" 
    onClick={showSidebar}
    >{t("outdoor")} <FontAwesomeIcon icon={faArrowDown} /></button>


    <div className='search'>
    <input className="type" onKeyUp={handleSearch} onChange={handleInputChange}
      value={query} placeholder={t("enter")}/>
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={clickSearch} className='searchGlass'/>
      </div>
</div>
</div>

<div className='productGroup'>
{(selectedCategory) && <div className='productGroup'> {myinfo} </div> }

</div>

        </section>

        <section className="map">
            <div className='mapContent'>
        <iframe 
        className='left'
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14758.21467974787!2d114.12079453468321!3d22.370475715608812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2shk!4v1706617984177!5m2!1szh-TW!2shk" 
         style={{border:0}} allowFullScreen="" 
        loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className='right'>
        <div>
            <h5>{t("companyName")}</h5>
            <h5>{t("location1")}</h5>
        </div>
        <div>
            <h5>{t("shopName")}</h5>
            <p>{t("experienceStore")}</p>
            <h5>{t("path")}</h5>
            <p>https://www.youtube.com/watch?v=g7zC_LYk2Xo</p>
        </div>
        <div>
            <p>{t("officeHours1")}</p>
            <p>{t("officeHours2")}</p>
            <p>{t("vocation")}</p>
        </div>
        <div>
            <p>Whatsapp/ Signal : 52637446</p>
            <p>Email : happyscooter@gmail.com</p>
            <p>{t("distribution")}<br />{t("distributionRule")}</p>
            <p>{t("target")}</p>
            <p>If you need English speaking customer support, please contact us at M#53637556</p>
        </div></div></div>
        </section>

        </div>
  )
}

export default Main