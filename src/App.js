import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SendTags from './SendTags';

import './App.css';

function App() {
  const [recipientsList, updateRecipientsList] = useState("");

  useEffect(() => {
    axios.get( process.env.REACT_APP_API_KEY )
         .then( res => { updateRecipientsList( res.data ) })
         .catch( err => { console.dir(err) });
  }, []);

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: "#153D5C"}}>
      <img alt="nr_beta_logo" 
          src="https://noterouter-staging.firebaseapp.com/static/media/logo.b10c9223.png" 
          style={{width: '30%'}} />
        <SendTags recipientsList={ recipientsList } />
      </header>
    </div>
  );
}

export default App;
