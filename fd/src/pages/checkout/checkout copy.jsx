import React, {useState, useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseCart, removeFromCart} from '../../component/payment/Redux/cartSlice copy';
import { addPrice, subtractPrice }  from '../../component/payment/Redux/priceSlice';
import { Table, Button } from 'reactstrap';
import ShowContext from '../../index';
import {Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import Modal from './Modal/Modal2'  
import './checkout.css'
import { allChProducts, allEngProducts, moneyData, allSimpleChProducts } from '../../data.jsx';

const Checkout = () => {
    const { t} = useTranslation();
    const cartitems = useSelector(state => state.cart.cartItems);
    const [display, setDisplay] = useState("flex");
    const [index, setIndex] = useState(50);
    const [showModal, setShowModal] = useState(false);
    const [overflow, setOverflow] = useState('none');
    const navigate = useNavigate();
    const [itemTitle, setItemTitle] = useState()
    const {setQty, Total, moneyIndex, Lan} = useContext(ShowContext);
    console.log(Total)
    const dispatch = useDispatch();
    const cartQuantities = cartitems.map(item => item.cartQuantity);
    let total = 0;
    localStorage.setItem("totalValue", JSON.stringify(total));
    const [sum, setSum] = useState(total);
        useEffect(()=>{
        cartitems.forEach(item => {
            console.log(allChProducts.All[item.id-1].title)
            console.log(item.title)
            if(Lan === "繁體中文"){
                setItemTitle(allChProducts.All[item.id-1].title)
              } else if(Lan === "简体中文"){
                setItemTitle(allSimpleChProducts.All[item.id-1].title)
              } else if(Lan === "English"){
                setItemTitle(allEngProducts.All[item.id-1].title)
              }
          total += item.price * item.cartQuantity * moneyData[moneyIndex].currency;
        });
      
        if (total <= 0) {
          setSum(0);
          localStorage.setItem("totalValue", 0);
        } else {
          setSum(total);
        }
}

    , [ cartQuantities, cartitems, moneyIndex, Lan])
    const handleAddToCart = (item, curr) => {
        dispatch(addToCart(item));
        dispatch(addPrice({productId: item.id}));
    };

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
        dispatch(subtractPrice({productId: item.id}));
    };
    const handledecreaseCart = (item) => {
        dispatch(decreaseCart(item));
        dispatch(subtractPrice({productId: item.id}));
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
const useremail = localStorage.getItem('useremail'); 
        if (!useremail) {  
            navigate("/login/"); 
            return; 
        }else{
    setShowModal(true);
        }
    };
  
    return (
        <body>
            <div className="checkout-wrapper">
                <h4><Link
    className='link-item'
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}>{t("home")}</Link>{">"}{t("cart")}</h4>
                <div className='become-member'>
                    <h4>{t("become")}</h4>
                    <p>{t("here")} <Link
                    to="/register/"
                    style={{ textDecoration: "underline", color: "black" }}
                  ><em>{t("signUp")}</em></Link> {t("or")} <Link
                  className='link-item'
                  to="/login/"
                                  style={{ textDecoration: "underline", color: "black" }}
                                ><em><strong>{t("login")}</strong></em></Link>.</p>
                </div>
                <section>
                    <h1>{t("cart")}</h1>
                    <Button>{t("removeChoice")}</Button>
                    <Table className='max' style={{width:"100%"}}>
                        <thead >
                            <tr>
                                <th >
                                    <input type='checkbox'/>
                                </th>
                                <th>
                                {t("merchandise")}
                                </th>
                                <th>
                                {t("productIntro")}
                                </th>
                                <th>
                                {t("qty")}
                                </th>
                                <th>
                                {t("price")}
                                </th>
                                <th>
                                {t("action")}
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {cartitems.map((item, id ) => (
                                <tr key={id} className="list" style={{padding: "50px 50px"}}>
                                    <th><input type='checkbox'/></th>
                                    <td><img src={item.image} className="c-image" alt='' /></td>
                                    <td >{itemTitle}</td>
                                    <td><Button  onClick={()=>{handledecreaseCart({id: item.id, title: item.title, image: item.img1, price: Number(item.price), curr: moneyData[moneyIndex].currency});setQty(cartitems[id].cartQuantity);}}>-</Button><p >{item.cartQuantity}</p>
                                    <Button onClick={()=>{handleAddToCart({id: item.id, title: item.title, image: item.img1, price: Number(item.price)});setQty(cartitems[id].cartQuantity);}}>+</Button></td>
                                    <td style={{display:"flex", textAlign: "right"}}><p >{moneyData[moneyIndex].symbol} {Math.floor(item.price * moneyData[moneyIndex].currency) * item.cartQuantity}</p></td>
                                    <td><button className="btn btn-warning btn-sm" onClick={() => handleRemoveFromCart(item)}>Remove</button></td>
                                </tr>
                            ))
}
                            <tr>
                                <th scope="row" colSpan="1.5">
                                </th>
                                <td>
                                </td>
                                <td colSpan="3.5">
                                    <Button onClick={handleSubmit}>{t("checkOut")}</Button>
                                    <span>{t("sum")}：{moneyData[moneyIndex].symbol} {Math.floor(sum)}</span>
                                </td>
                            </tr>                     
   
                        </tbody>

                    </Table>
                    <Table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th >
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
                        <tbody className='mini'>
                            {cartitems.map((item, id ) => (
                                <tr key={id} className="list" style={{padding: "50px 50px"}}>
                                    <th><input type='checkbox'/></th>
                                    <td>
                                        <div>
                                            <div className='img'>

                                        <img src={item.image} className="c-image" alt='' />
                                            </div>
                                        <div>
                                    {itemTitle}
                                    <div>
                                    <Button  onClick={()=>{handledecreaseCart(item);setQty(cartitems[id].cartQuantity);}}>-</Button><p >{item.cartQuantity}</p><Button onClick={()=>{handleAddToCart(item);setQty(cartitems[id].cartQuantity);}}>+</Button>
                                    </div>
                                    <p >{moneyData[moneyIndex].symbol} {Math.floor(item.price * moneyData[moneyIndex].currency) * item.cartQuantity}</p>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                                        </div>
                                        </div></td>
                                </tr>
                            ))
}
                            <tr>
                                <th scope="row" colSpan="1">
                                </th>
                                <td colSpan="3">
                                    <Button onClick={handleSubmit}>{t("checkOut")}</Button>
                                    <span>{t("sum")}：${sum}</span>
                                </td>
                            </tr>                     
   
                        </tbody>
                    </Table>
                </section>
                <div style={{display:"flex", justifyContent:"center"}}>
<Modal total={sum} showModal={showModal}setShowModal={setShowModal} setOverflow={setOverflow} setDisplay={setDisplay} setIndex={setIndex}/>
  </div>
            </div>
        </body>
    )
}

export default Checkout
