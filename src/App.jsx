import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx'
import TextToSpeech from './screens/TextToSpeech.jsx'
import Credits from './screens/Credits.jsx'
import History from './screens/History.jsx'
import Navbar from './components/Navigation/Navbar.jsx'
import { Provider } from 'react-redux'
import { store } from './store'
import { useEffect } from 'react';
import { setUser } from './redux/userSlice'
import axios from 'axios'

function App() {
   
  useEffect(() => {
    axios.get('http://localhost:3000/user', { withCredentials: true })
      .then(response => {
        store.dispatch(setUser(response.data[0]));
      })
      .catch(error => {
        console.error(error);
      });
  }, []) // Add an empty dependency array to ensure the effect runs only once
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="credits" element={<Credits />} />
          <Route path="history" element={<History />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
