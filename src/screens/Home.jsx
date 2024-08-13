import '../styles/screens/Home.css'
import GoogleButton from 'react-google-button'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Home() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    return (
        <div className='page-container'>
            {
                !user &&
                <GoogleButton
                onClick={() => {window.location.href = 'http://localhost:3000/auth/google'}} 
                /> 
            }
            <button onClick={() => navigate('/text-to-speech')}>Text to Speech</button>
            <button onClick={() => navigate('/credits')}>Buy Credits</button>
            <button onClick={() => navigate('/history')}>History</button>
        </div>
    )
}

export default Home
