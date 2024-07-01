import React, { useEffect, useRef, useState } from 'react';
import { LanguageOptions } from './common/Constants';

import langImg from '../assets/images/header_lang_icn.svg'
import searchImg from '../assets/images/search.svg'
import logo from '../assets/images/newslogo.svg'

const LanguageSelector = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); 
  const [showLang, setShowLang] = useState(false);
  const [userInput , setUserInput] = useState('')

  const ref = useRef(null);


  useEffect(()=>{
    props.updateUserselectionCB(selectedLanguage,userInput)
  },[userInput,selectedLanguage ,props])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowLang(false); 
      }
    };

    if (showLang) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showLang]);

  const onToggleLanguages = () => {
    setShowLang(!showLang); 
  };

  const onSelectLanguage = (languageCode) => {
    setSelectedLanguage(languageCode.id);
    setShowLang(false); 
  };

  function handleInput(e) {
    setUserInput(e.target.value)
  }

  return (
    <div className="language-selector">
     <div className='navbar'>
      <div className='logo-container'>
        <img src={logo}/>
        <div className='app-header'>NEWS FUSE</div>
      </div>
      <div className='nav-right'>
      <div className='user-input'>
        {/* <div className='search-img'> */}
          <img src={searchImg}/>
          {/* </div> */}
        <input type='text' value={userInput} onChange={handleInput} name='search-text'/>
      </div>
      <div className='langselect-container'>
      <button onClick={onToggleLanguages} className='sele-prefferd-lang'>
        <div className='sele-image'><img src={langImg}/></div>
        </button>
      {showLang && (
        <div className="language-options" ref={ref}>
          {LanguageOptions.map((item) => (
            <button key={item.ld} onClick={() => onSelectLanguage(item)}>
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
