import React, { useState, useContext, useEffect } from 'react'
import "./productPage.css"
import ShowContext from '../../../index'
import { moneyData } from '../../../data'
import {useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { addToCart, decreaseCart } from '../../../component/payment/Redux/cartSlice copy'
import { addPrice, subtractPrice }  from '../../../component/payment/Redux/priceSlice'
import SliderComponent from './slider/slider'
const ProductPage = ({resultCh, resultEng, resultSimpleChi}) => {
    const [result, setResult] = useState(resultCh);
    const { t } = useTranslation();
    const cartitems = useSelector(state => state.cart.cartItems);
    const {Lan, index, qty, setQty, moneyIndex} = useContext(ShowContext);
    
    useEffect(()=>{
        if(cartitems.length === 0){
            setQty(0)
        }else{cartitems.forEach((item)=>{
              if(item.id === (index)){
    setQty(item.cartQuantity)
        }else{
            setQty(0)
        }
        })
        
    }
    } , [cartitems, cartitems.length])

    useEffect(()=>{
        if(Lan ==="繁體中文"){
            setResult(resultCh);
        }else if(Lan ==="简体中文"){
            setResult(resultSimpleChi);
        }else if(Lan ==="English"){
            setResult(resultEng);
        }
    }, [Lan])
    
const [color, setColor] = useState("")
    const handleChoice = (e)=>{
setColor(e.target.value)
    };
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addToCart({
            id: result.All[index-1].id, 
            title: result.All[index-1].title, 
            image: result.All[index-1].img1, 
            price: result.All[index-1].price}));
        dispatch(addPrice({productId: item.id}));
    };

    const handledecreaseCart = (item) => {
        dispatch(decreaseCart({
            id: result.All[index-1].id, 
            title: result.All[index-1].title, 
            image: result.All[index-1].img1, 
            price: result.All[index-1].price}));
        dispatch(subtractPrice({productId: item.id}));
    };

    const handlefirstbutton = () =>{
        document.querySelector(".productDetails").style.display = "block";
        document.querySelector(".selectIntro button:first-child").style.borderBottom = "2px solid black";
        document.querySelector(".selectIntro button:first-child").style.color = "black";
        document.querySelector(".selectIntro button:last-child").style.borderBottom = "none";
        document.querySelector(".selectIntro button:last-child").style.color = "gray";
        document.querySelector(".comment").style.display = "none";
    }
    useEffect(()=>{
        handlefirstbutton();
    },[])
    const handlesecondbutton = () =>{
        document.querySelector(".productDetails").style.display = "none";
        document.querySelector(".selectIntro button:first-child").style.borderBottom = "none";
        document.querySelector(".selectIntro button:first-child").style.color = "gray";

        document.querySelector(".selectIntro button:last-child").style.borderBottom = "2px solid black";
        document.querySelector(".selectIntro button:last-child").style.color = "black";
        document.querySelector(".comment").style.display = "flex";
    }
  return (
    <div className='productDescription'>
        <section className='productIntro'>
            <div className='left'>
                <div className='img'>
                <SliderComponent result={result}/>
                </div>
                </div>
            <div className='right'>
                <h1><strong>{result.All[index-1].title}</strong></h1>
                <div className='sellingPrice'>
                    <span>{t("cost")}</span>
                    <h4>{moneyData[moneyIndex].symbol} {Math.ceil(result.All[index-1].price * moneyData[moneyIndex].currency)}</h4>
                </div>
                <div className='selectColor'>
                    <h4>{t("choice")}</h4>
                    <select name="" id="" onChange={handleChoice}>
                    <option value="black">{t("black")}</option>
                    <option value="white">{t("white")}</option></select>
                </div>
                <div className='quantity'>
                    <h4>{t("qty")}</h4>
                    <div>
                    <button  onClick={()=>{handledecreaseCart(result.All[index-1]);}}>-</button>
                    {qty}
                    <button onClick={()=>{handleAddToCart(result.All[index-1]);}}>+</button>
                    </div>
                </div>
<div className='involve'>
    <button onClick={()=>{handleAddToCart(result.All[index-1]);}}>{t("add")}</button>
    <button>{t("order")}</button>
</div>
<button className='contact'>{t("contactShop")}</button>
            </div>
        </section>
        <section className='second-Part'>
            <div className='selectIntro'>
            <button onClick={handlefirstbutton}>{t("productIntro")}</button>
            <button onClick={handlesecondbutton}>{t("make-comment")}</button>
            </div>
<div className='details'>
    <div className="productDetails">
        <p>{result.All[index-1].intro1}</p>
        <p>{result.All[index-1].intro2}</p>
        <p>{result.All[index-1].intro3}</p>
        <p>{result.All[index-1].intro4}</p>
        <p>{result.All[index-1].intro5}</p>
    </div>
    <div className='comment'>
    <p>{t("comment")}</p>

    </div>
</div>
        </section>
    </div>
  )
}

export default ProductPage