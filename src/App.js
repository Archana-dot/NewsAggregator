import { useState } from 'react';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import './assets/css/global.css'
import LanguageSelector from './components/LanguageSelector';
import NewsfeedComponent from './components/NewsfeedComponent';

function App() {

  const [lang , setLang ] = useState('')
  const [userInput , setUserInput ] = useState('')

  function updateUserselection(lang,input) {
    setLang(lang)
    setUserInput(input)
  }

  return (
    <div className="App">
      <LanguageSelector updateUserselectionCB={updateUserselection} />
      <div className='news-base'>
      <WeatherComponent/>
      <NewsfeedComponent lang={lang} input={userInput}/>
      </div>
    </div>
  );
}

export default App;
