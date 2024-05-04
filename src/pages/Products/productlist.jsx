import React, { useContext} from 'react';
import './productlist.css'
import ShowContext from '../../index';
import MultiRangeSlider from "./mutiple-range/MultiRangeSlider"
import { useTranslation} from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { faMagnifyingGlass, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const Productlist = ({ clickSearch, handleSearch, sortAscending, myinfo, handleChange, query, handleInputChange, handleClick}) => {
    const { t } = useTranslation();
    const { show, setShow, selectedCategory} = useContext(ShowContext);

     const showSidebar = () => {
        const sidebar = document.querySelector('.leftSidebar');
        sidebar.style.display = show;
        sidebar.style.width = '60vw';
        setShow("flex")
     }
        
  return (
    <div className='product container'>
    <section className='bigScreen'>
        <div className='bigScreen-wrapper'>
                        <div className='left'>
            <h4><strong>{t("merchandise")}</strong></h4>
            <div className='search'>
<input className="type" onKeyUp={handleSearch} onChange={handleInputChange}
      value={query} placeholder={t("enter")}/>
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={clickSearch} className='searchGlass'/>
</div>
<div className='item-hover'>
            <h5>{t("product")}</h5>
</div>
<div className='item-hover'>
        <select onChange={handleClick}>
        <option value="All">{t("outdoor")}</option>
        <option value="Electric Mobility">{t("electricMobility")}</option>
        <option value="Manual Bicycle">{t("manualBicycle")}</option>
        <option value="Accessories">{t("accessories")}</option>
      </select>
</div>


        <div className='info'>
            <h4>{t("sort")}</h4>
<select onChange={sortAscending}>
<option value="Asc" 
>{t("sortbylower")}<ArrowUpOutlined /></option>
<option value="Desc"
>{t("sortbyhigher")}<ArrowDownOutlined /></option>
</select>
<div className='range'>
      <h4>{t("priceRange")}</h4>
      <MultiRangeSlider
      min={0}
      max={10000}
      handleChange={handleChange}
     onChange={({ min, max }) => {}}
    />
    </div>
        </div>
</div>

        <div className='right'>
{(selectedCategory) && <div className='productGroup'> {myinfo} </div> }
        </div>
        </div>

    </section>

    <section className='smallScreen'> 
<div className='info'>
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
<input className='type' onChange={handleInputChange}
onKeyUp={handleSearch}
      value={query} placeholder={t("enter")}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={clickSearch} className='searchGlass'/>
      </div>
</div>
</div>

{(selectedCategory) && <div className='productGroup'> {myinfo} </div> }

    </section>
    </div>
  )
}

export default Productlist