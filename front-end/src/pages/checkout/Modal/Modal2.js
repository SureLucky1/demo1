import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../../../component/payment/Redux/cartSlice copy';
import { clearTotal } from '../../../component/payment/Redux/priceSlice';
import "./Modal.css";
import { MdClose } from 'react-icons/md';
import { moneyData } from '../../../data';
import { useTranslation } from 'react-i18next';
import ShowContext from '../../..';
const Modal = ({ total, showModal, setShowModal }) => {
  const {moneyIndex} = useContext(ShowContext);
  const cartitems = useSelector(state => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const Total = useSelector(state => state.price.total);
  const dispatch = useDispatch();
  const { t} = useTranslation();
  const check = () => {
    if ((!paymentMethod) || (cardNumber === "")) {
      alert("Please select a payment method.");
    } else {
      const records = cartitems.map(item => ({
        image: item.image,
        name: item.title,
        quantity: item.cartQuantity,
        price: item.price * moneyData[moneyIndex].currency,
        productId: item.id,
    }));
    const totalPrice = cartitems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
    const itemgroup = {
        record: records,
        cost: totalPrice,
        userId: localStorage.getItem('useremail'),
    };
        fetch("http://localhost:5000/addP", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(itemgroup),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok") {
              alert("Purchase Successful");
            } else {
              alert("Something went wrong");
            }
          });
      dispatch(clearCart());
      dispatch(clearTotal());
      setShowModal(prev => !prev);
    }
  }

  return (
    <>
      {showModal ? (
        <div className='modal'>
          <div>
            <form>
              <label htmlFor="fname">{t("payMethod")}</label><br />
    <select id="paymentMethod" name="paymentMethod" onChange={e => setPaymentMethod(e.target.value)}>
    <option value="Paypal">Paypal</option>
    <option value="Master Card">Master Card</option>
    <option value="American Express">American Express</option>
    <option value="Tap & Go">Tap & Go</option>
    <option value="AliPay">AliPay</option>
    <option value="WeChat Pay">WeChat Pay</option>
    <option value="Pay Me">Pay Me</option>
    <option value="FPS">FPS</option>
    <option value="Union Pay">Union Pay</option>
    <option value="Apple Pay">Apple Pay</option>
    <option value="Google Pay">Google Pay</option>
    <option value="銀行轉賬">銀行轉賬</option>
    <option value="BoC Pay">BoC Pay</option>
  </select>
              <label className='card'>{t("cardNumbers")}</label><br />
              <input type="text" id="lname" placeholder="e.g. XXXX-XXXX-XXXX-XXXX" onChange={e => setCardNumber(e.target.value)} />

              <h2>{t("sum")}: {moneyData[moneyIndex].symbol}{Math.floor(total)}</h2>
            </form>
            <button className="btn btn-success" onClick={check}>
            {t("checkOut")}
            </button>
            <MdClose
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
                style={{cursor: "pointer",
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "32px",
                height: "32px",
                backgroundColor:"white",
                padding: 0,
                zIndex: 10}}
              />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
