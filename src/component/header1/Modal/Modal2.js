import React from 'react';
import "./Modal.css";
const InputModal = ({ handleSearch, showModal, setShowModal, handleInputChange, query }) => {

  return (
    <>
      {showModal ? (
        <section className='input-modal' 
        onClick={(e) => {
          if (e.target.className !== "small-input") {
            setShowModal(false);
          }
        }}
        >
          <div>
<div className='input-group' >
  <input   
  className='small-input'    
  onChange={handleInputChange}
  onKeyUp={handleSearch}
  onBlur={() => setShowModal(prev => !prev)}
      value={query} type="text" />
  </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default InputModal;
