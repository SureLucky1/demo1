import React, {useState, useContext, useEffect} from 'react'
import { useSelector} from 'react-redux';
import { Table, Button } from 'reactstrap';
import ShowContext from '../../index';
import { useTranslation} from 'react-i18next';
import { Link } from "react-router-dom";
import { allChProducts, allEngProducts, moneyData, allSimpleChProducts } from '../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css'
const Order = () => {
    const [itemTitle, setItemTitle] = useState();
    const cartitems = useSelector(state => state.cart.cartItems);
    const {Lan, moneyIndex, chooseRecord, setChooseRecord} = useContext(ShowContext);
useEffect(()=>{
    chooseRecord.forEach(item => {
        item.record.forEach((subItem)=>{
                    if(Lan === "繁體中文"){
            setItemTitle(allChProducts.All[subItem.productId-1].title)
          } else if(Lan === "简体中文"){
            setItemTitle(allSimpleChProducts.All[subItem.productId-1].title)
          } else if(Lan === "English"){
            setItemTitle(allEngProducts.All[subItem.productId-1].title)
          }
        })
})
    if(chooseRecord === null)
    setChooseRecord(cartitems);
}, [chooseRecord, Lan])
const { t} = useTranslation();
    return (
        <body>
            <div className="order-wrapper">
            <h4><Link to="/profile/" style={{textDecoration: "none", color: "black"}}>{t("user")}</ Link>{">"}{t("orders")}</h4>
                <section>
                    <h1>{t("shopRecord")}</h1>
                    <Table className="laptop" style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th >
                                    <input type='checkbox'/>
                                </th>
                                <th >
                                {t("merchandise")}
                                </th>
                                <th >
                                    {t("productIntro")}
                                </th>
                                <th >
                                {t("qty")}
                                </th>
                                <th >
                                {t("price")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {chooseRecord.map((item, id ) => (
                                item.record.map((subitem, id)=>(
                                <tr key={id} className="list" style={{padding: "50px 50px"}}>
                                    <th><input type='checkbox'/></th>
                                    <td><img src={subitem.image} className="c-image" alt='' /></td>
                                    <td >{itemTitle}</td>
                                    <td><p >{subitem.quantity}</p></td>
                                    <td style={{display:"flex", textAlign: "right"}}><p >{moneyData[moneyIndex].symbol} {Math.floor(subitem.price * moneyData[moneyIndex].currency)}</p></td>
                                </tr>
                                ))))}               
                        </tbody>
                    </Table>
                    <Table className="mobile" style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox'/>
                                </th>
                                <th>
                                {t("merchandise")}
                                </th>
                                <th>
                                {t("productIntro")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {chooseRecord.map((item, id ) => (
                                item.record.map((subitem, id)=>(
                                <tr key={id} className="list" style={{padding: "5px 0px"}}>
                                    <th><input type='checkbox'/></th>
                                    <td colspan="1">
                                        <div className='img'>
                                        <img src={subitem.image} className="c-image" alt='' />
                                        </div>
</td>
                                    <td colspan="3">
                                        <div>

                                        {itemTitle}
                                    <p >{subitem.quantity}</p>
                                    <p >${subitem.price}</p>
                                        </div>
                                        </td>
                                </tr>
                                ))))}               
                        </tbody>
                    </Table>
                </section>
            </div>
        </body>
    )
}

export default Order
