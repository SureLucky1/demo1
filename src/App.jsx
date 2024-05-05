import './App.css'
import {useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import UpperHeader from './component/header1/header.jsx'
import LowerHeader from './component/header2/header.jsx'
import Footer from './pages/Footer/Footer.jsx';
import React, { useEffect, useState } from 'react'
import Main from './pages/main/main.jsx';
import AboutUs from './pages/Abous/abousUs.jsx';
import Login from './pages/login/login.jsx';
import UpdateProfile from "./pages/userProfile/UpdateProfile.jsx";
import Privacy from './pages/Privacy/privacy.jsx';
import Legalization from './pages/legalization and distribution/legalization.jsx';
import Productlist from './pages/Products/productlist.jsx';
import Maintenance from './pages/Maintenance/maintenance.jsx';
import LegalizationEng from './pages/legalization and distribution/legalizationEng.jsx';
import Register from './pages/register/register.jsx';
import ProfilePage from "./pages/userProfile/Profile.jsx"
import Order from './pages/myOrder/Order.jsx';
import ResetPassword from "./pages/userProfile/ResetPassword.jsx"
import ShowContext from './index.js';
import ProductPage from './pages/Products/product-page/productPage.jsx';
import { allChProducts, allEngProducts, moneyData, allSimpleChProducts } from './data.jsx';
import Checkout from './pages/checkout/checkout copy.jsx';
import { addToCart } from './component/payment/Redux/cartSlice copy.jsx';
import { addPrice, setCurrency }  from './component/payment/Redux/priceSlice.jsx';
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [show, setShow] = useState("none");
  const [Lan, setLan] = useState("繁體中文")
  const [moneyIndex, setMoney] = useState(56)
  const [index, setIndex] = useState(0)
  const Total = useSelector(state => state.price.total);
  const [qty, setQty] = useState(0);
  const [rightsidebardisplay, setRightSideBarDisplay] = useState("none");
  const [leftsidebardisplay, setLeftSideBarDisplay] = useState("none");
  const [rightsidebarWidth, setRightSideBarWidth] = useState("0");
  const [leftsidebarWidth, setLeftSideBarWidth] = useState("0");

  const [login, setLogin] = useState(false);
  const [chooseRecord, setChooseRecord] = useState([])
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState({price:{ min: 0, max: 10000 }});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortedProducts, setSortedProducts] = useState(null);
  const dispatch = useDispatch()
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const showSidebar = () => {
    const sidebar = document.querySelector('.leftSidebar');
        sidebar.style.display = "flex";
        sidebar.style.width = '60vw';
}
  const handleInputChange = (event) => {

      setQuery(event.target.value);
  
  };
  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      setSearch(event.target.value);
    }
  };
  const handleClickSearch = () => {
      setSearch(document.querySelector('.large-input').value);
  };

  const handleSideClick = (e) =>{
    handleSideBar(e);
    handleSideBar2(e);

  }

  const handleSideBar = (e)=>{ 
    if (e.target.className === "material-symbols-outlined right") {
      if(rightsidebardisplay ==="none"){
        setRightSideBarDisplay("flex");
        setRightSideBarWidth("50%");
        setLeftSideBarDisplay("none")
        setShow("none")
      }else if(rightsidebardisplay === 'flex'){
        setRightSideBarDisplay("none")
        setRightSideBarWidth("0");
      }
    }else if(e.target.className === "material-symbols-outlined left"){
      if(leftsidebardisplay ==="none"){
        setLeftSideBarDisplay("flex");
        setRightSideBarDisplay("none")
        setRightSideBarWidth("0");
        setShow("none")
      }else if(leftsidebardisplay === 'flex'){
        setLeftSideBarDisplay("none")
        setLeftSideBarWidth("0");
      }
    }else{
      setRightSideBarDisplay("none")
      setLeftSideBarDisplay("none")
      setRightSideBarWidth("0");
             if(e.target.className !=="large-input"){
         document.querySelector(".large-input").style.opacity = 0;
         document.querySelector(".large-input").style.width= 0;
       }
    }
    }

const handleSideBar2 = (e) => {
  if (!e.target.classList.contains("leftSidebar2")) {
    const sidebar = document.querySelector('.leftSidebar');
    sidebar.style.display = "none";
  }
}

  const handleClick = (event) => {
    const sidebar = document.querySelector('.leftSidebar');
setSelectedCategory(event.target.value);          
      sidebar.style.display = "none";
  };

  const sortAscending = (event) => {
    setSortedProducts(event.target.value.toString());

  };           
  
  const [currentPage, setCurrentPage] = useState(1)
  let npage;
  let numbers = [];

  function filteredData(allProducts, selected, selectedPrice, query, sortOrder) {
    let filteredProducts = allProducts[selected].slice();
    npage = Math.ceil(filteredProducts.length / 10);
    numbers = [...Array(npage +1).keys()].slice(1);

    if (query) {
      filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(({ price }) => price >= selectedPrice.price.min && price <= selectedPrice.price.max);
    }

    if (sortOrder === "Asc") {
      filteredProducts.sort((a, b) => a.price.toString() - b.price.toString());
    } 

    if (sortOrder === "Desc") {
      filteredProducts.sort((a, b) => b.price.toString() - a.price.toString());
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    filteredProducts = filteredProducts.slice(firstIndex, lastIndex);

    return filteredProducts.map((item, i) => {
      return (
        <div key={i} className='product' onClick={()=>{setIndex(item.id)}}>
          <Link to="/productInfo" style={{ textDecoration: "none", color:"black" }}><img src={item.img1} />
          <h6>{item.name}</h6>
          <span>{moneyData[moneyIndex].money} ({moneyData[moneyIndex].symbol}){Math.floor(item.price * moneyData[moneyIndex].currency)}</span></Link>
          <button className="btn btn-warning" onClick={() => {
            dispatch(addToCart({id: item.id, title: item.title, image: item.img1, price: Number(item.price), curr: moneyData[moneyIndex].currency}));
            dispatch(addPrice({productId: item.id}));
          }}>Add to cart</button>
        </div>
      );
    });
  }

  function info(result){
      function prePage(){
  if(currentPage !== 1){
    setCurrentPage(currentPage - 1);
  }
    }
    function changeCPage(id){
  setCurrentPage(id);
    }
    function nextPage(){
      if(currentPage !== npage){
        setCurrentPage(currentPage + 1);
      }
    }
    return(
            <>
{result}
                         <nav>
                   <ul className="pagination">
     <li className="page-item">
       <a href="#" className="page-link" onClick={prePage}><FontAwesomeIcon icon={faArrowLeft} /></a>
     </li>
     {
       numbers.map((n, i) =>(
         <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
           <a href="#" className="page-link" onClick={()=>{changeCPage(n)}}>{n}</a>
         </li>
       ))
     }
     <li className="page-item">
       <a href="#" className="page-link" onClick={nextPage}><FontAwesomeIcon icon={faArrowRight} /></a>
     </li>
                     </ul>
                     </nav>
    </>
        );
  
  }
const [outdoor, setOutdoor] = useState("戶外運動");
const [electric, setElectric] = useState("電動可移動工具");
const [manual, setManual] = useState("人力滑板車, 單車");
const [accessories, setAccessories] = useState("配件類");
const [pro, setPro] = useState("全部商品");
const [proCa, setProCa] = useState("商品分類");
  const myinfo = info(result);
  useEffect(() => {
    let updatedResult = [];
    if(Lan === "繁體中文"){
      setOutdoor("戶外運動");
      setElectric("電動可移動工具");
      setManual("人力滑板車, 單車");
      setAccessories("配件類")
      setPro("全部商品");
      setProCa("商品分類");

      updatedResult = filteredData(allChProducts, selectedCategory, selectedPrice, search, sortedProducts);
    } else if(Lan === "简体中文"){
         setOutdoor("户外运动");
      setElectric("电动可移动工具");
      setManual("人力滑板车, 单车");
      setAccessories("配件类")
      setPro("全部商品");
      setProCa("商品分类");

      updatedResult = filteredData(allSimpleChProducts, selectedCategory, selectedPrice, search, sortedProducts);
    } else if(Lan === "English"){
             setOutdoor("Outdoor Sport");
      setElectric("Electric Mobility");
      setManual("Manual Bicycle");
      setAccessories("Accessories");
      setPro("All Products");
      setProCa("Categories");
      updatedResult = filteredData(allEngProducts, selectedCategory, selectedPrice, search, sortedProducts);
    }
    setResult(updatedResult);
  }, [currentPage, Lan, moneyIndex, allChProducts, allSimpleChProducts, allEngProducts, selectedCategory, selectedPrice, search, sortedProducts]);
  
useEffect(()=>{
setQuery("")
    setSearch("");

}, [currentPage, allChProducts, allSimpleChProducts, allEngProducts, selectedCategory, selectedPrice, sortedProducts])

  return (
    <ShowContext.Provider value={{Lan, setLan, setCurrency, moneyIndex, setMoney, rightsidebarWidth, setRightSideBarWidth, leftsidebardisplay, setLeftSideBarDisplay, rightsidebardisplay, setRightSideBarDisplay, Total, qty, setQty, index, login, setLogin, chooseRecord, setChooseRecord, name, setName, price, setPrice, quantity, setQuantity, sortedProducts, setSortedProducts, setSelectedPrice, show, setShow, query, setQuery, selectedCategory, setSelectedCategory, setSearch}}>
      <div className="App" onClick={handleSideClick}>
        <div className='leftSidebar' 
        onBlur={handleSideBar2}
        >
          <h1><strong>{proCa}</strong></h1>
          <h1>{pro}</h1>
          <select onChange={handleClick} 
          className='leftSidebar2'
          >
        <option value="All">{outdoor}</option>
        <option value="Electric Mobility">{electric}</option>
        <option value="Manual Bicycle">{manual}</option>
        <option value="Accessories">{accessories}</option>
      </select>
        </div>
        <UpperHeader query={query} clickSearch={handleClickSearch} handleInputChange={handleInputChange} handleSearch={handleSearch}/>
        <LowerHeader />
        <Routes>
        <Route path="/" element={<Main showSidebar={showSidebar} clickSearch={handleClickSearch} handleSearch={handleSearch} sortAscending={sortAscending} myinfo={myinfo}  handleClick={handleClick} query={query} handleInputChange={handleInputChange}/>} />
        <Route path="about-us/" element={<AboutUs />} />
        <Route path="privacy/" element={<Privacy />} />
      <Route path="legalization" element={<Legalization />} />
       <Route path="product/" element={<Productlist showSidebar={showSidebar} clickSearch={handleClickSearch} handleSearch={handleSearch} sortAscending={sortAscending} myinfo={myinfo} query={query} handleInputChange={handleInputChange} handleClick={handleClick}/>} />
      <Route path="maintenance/" element={<Maintenance />} />
      <Route path="maintenanceEng/" element={<LegalizationEng />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="register/" element={<Register />} />
      <Route path="login/" element={<Login />} />
      <Route path="order/" element={<Order />} />
      <Route path="profile/" element={<ProfilePage />} />
      <Route path="/profile/update" element={<UpdateProfile />} />
      <Route path="/reset-password/:useremail/:token" element={<ResetPassword />} />
      <Route path="/productInfo" element={<ProductPage resultCh={allChProducts} resultEng={allEngProducts} resultSimpleChi={allSimpleChProducts}/>} />
      </Routes>
        <Footer />
      </div>
    </ShowContext.Provider>
  );
}

export default App;
