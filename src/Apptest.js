import './App.css'
import {useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import UpperHeader from './component/header1/header.jsx'
import LowerHeader from './component/header2/header.jsx'
import React, { useEffect, useState, useMemo } from 'react'
import Main from './pages/main/main';
import AboutUs from './pages/Abous/abousUs.jsx';
import Login from './pages/login/login.jsx';
import Privacy from './pages/Privacy/privacy.jsx';
import Legalization from './pages/legalization and distribution/legalization.jsx';
import Productlist from './pages/Products/productlist.jsx';
import Maintenance from './pages/Maintenance/maintenance.jsx';
import LegalizationEng from './pages/legalization and distribution/legalizationEng.jsx';
import Register from './pages/register/register.jsx';
import ShowContext from './index.js';
import { allProducts } from './data.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import { addToCart } from './component/payment/Redux/cartSlice';
import { addPrice } from './component/payment/Redux/priceSlice.jsx';
import { Routes, Route } from "react-router-dom";
function App() {
  const [selectedPrice, setSelectedPrice] = useState({price:{ min: 0, max: 10000 }});
  const [selectedCategory, setSelectedCategory] = useState("Electric Mobility");
  const [sortedProducts, setSortedProducts] = useState(null);
  const dispatch = useDispatch()
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  const sortAscending = (event) => {
    setSortedProducts(event.target.value.toString());

  };           
  
  const [currentPage, setCurrentPage] = useState(1)
  let npage;
  let numbers = [];
  
  function filteredData(allProducts, selected, selectedPrice, query, sortOrder) {
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    let filteredProducts = allProducts.slice(firstIndex, lastIndex);
    npage = Math.ceil(allProducts.length / recordsPerPage);
    numbers = [...Array(npage +1).keys()].slice(1);

    if (query) {
      filteredProducts = allProducts.filter(
        (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, title }) =>
          category === selected ||
          title === selected
      ).sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        if (a.category === b.category) {
          return a.id - b.id;  // 在相同的 category 中，根據 id 排序
        }
        return 0;
      });
    }
    
    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(
        ({ price }) =>
          price >= selectedPrice.price.min && price <= selectedPrice.price.max
      );
    }
    if (sortOrder === "Asc") {
      filteredProducts = filteredProducts.filter(
        ({ category }) =>
        category === selected
      ).sort((a, b) => a.price.toString() - b.price.toString());
    } 
    if (sortOrder === "Desc") {
      filteredProducts = filteredProducts.filter(
        ({ category }) =>
        category === selected
      ).sort((a, b) => b.price.toString() - a.price.toString());
    }
    return filteredProducts.map((item, i) => {
      return (
        <div key={i} className='product'>
          <img src={item.img1} />
          <h6>{item.title}</h6>
          <span>HKD ${item.price}</span>
          <button className="btn btn-warning" onClick={() => {
            dispatch(addToCart({id: item.id, title: item.title, image: item.img1, price:item.price}));
            dispatch(addPrice(item.price));
          }}>
            Add to cart
          </button>
        </div>
      );
    });
  }
  const result = filteredData( allProducts, selectedCategory, selectedPrice, query, sortedProducts);
  
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
       <a href="#" className="page-link" onClick={prePage}>Prev</a>
     </li>
     {
       numbers.map((n, i) =>(
         <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
           <a href="#" className="page-link" onClick={()=>{changeCPage(n)}}>{n}</a>
         </li>
       ))
     }
     <li className="page-item">
       <a href="#" className="page-link" onClick={nextPage}>Next</a>
     </li>
                     </ul>
                     </nav>
    </>


        
        );
  
  }
  const myinfo = info(result)
  const [show, setShow] = useState("none");

  useEffect(()=>{
    const sidebar = document.querySelector('.leftSidebar');
    sidebar.style.display = show;
    sidebar.style.width = '60vw';
  }, [show])

  const hideSidebar = () => {
    setShow("none")
  }

  const showSidebar = () => {
    setShow("flex")
  }

  return (
    <ShowContext.Provider value={{sortedProducts, setSortedProducts, setSelectedPrice, show, setShow, query, setQuery, selectedCategory, setSelectedCategory}}>
      <div className="App">
        <div onMouseLeave={hideSidebar} onMouseEnter={showSidebar} className='leftSidebar'>
          <h1><strong>商品分類</strong></h1>
          <h1>全部商品</h1>
          <select onChange={handleClick}>
        <option value="Outdoor">戶外運動 Outdoor</option>
        <option value="Electric Mobility">電動可移動工具 Electric Mobility</option>
        <option value="Manual Bicycle">人力滑板車, 單車 Manual Bicycle</option>
        <option value="Accessories">配件類 Accessories</option>
      </select>
        </div>
        <UpperHeader query={query} handleInputChange={handleInputChange}/>
        <LowerHeader />
        <Routes>
        <Route path="/" element={<Main myinfo={myinfo} handleClick={handleClick} query={query} handleInputChange={handleInputChange}/>} />
        <Route path="about-us/" element={<AboutUs />} />
        <Route path="privacy/" element={<Privacy />} />
      <Route path="legalization" element={<Legalization />} />
       <Route path="product/" element={<Productlist sortAscending={sortAscending} myinfo={myinfo} query={query} handleInputChange={handleInputChange} handleClick={handleClick}/>} />
      <Route path="maintenance/" element={<Maintenance />} />
      <Route path="maintenanceEng/" element={<LegalizationEng />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="register/" element={<Register />} />
      <Route path="login/" element={<Login />} />
      </Routes>
        
      </div>
    </ShowContext.Provider>
  );
}

export default App;
