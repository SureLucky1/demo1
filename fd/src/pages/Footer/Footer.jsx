import React from 'react'
import "./Footer.css"
import { useTranslation} from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

  return (
    
    <div>
        <div className='footer-wrapper'>
            <div className='upper'>
                <div className='left'>

                    <img src="" alt="" />
                    <p>{t("footer")}</p>

                </div>
                <div className='right'>                    
                <div>
                    <p>Whatsapp/Signal: +852 52637446</p>
                    <p>Mail: happycooter@gmail.com</p>
                </div>
                <div>
                    <p>FACEBOOK</p>
                    <p>YOUTUBE</p>
                    <p>INSTAGRAM</p>
                </div>
                </div>
            </div>
            <div className='lower'>
            <div className='left'><strong>Powered by SUPPERPOWER</strong></div>
            <div className='right'>
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/visa.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/ae.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/mastercard.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/tap_and_go.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/octopus.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/alipay.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/wechatpay.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/payme.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/fps.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/unionpay.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/applepay.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/googlepay.svg" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/banktransfer.png" alt="" />
                <img src="https://www.11boy.com.hk/image/paymentOptions_svg/bocPay.svg" alt="" />
            </div>

            </div>
        </div>
    </div>
  )
}

export default Footer