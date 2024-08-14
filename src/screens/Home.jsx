import '../styles/screens/Home.css'
import GoogleButton from 'react-google-button'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const signOut = () => {
        axios.post('http://localhost:3000/auth/sign-out', {}, { withCredentials: true })
        .then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error)
        })
    }
    const signIn = () => {
        window.location.href = 'http://localhost:3000/auth/google'
    }
    return (
        <div className='page-container'>
            {/* {
                !user &&
                <GoogleButton onClick={signIn} /> 
            }
            {user && <button onClick={() => signOut()}>Sign Out</button>}
            <button onClick={() => navigate('/text-to-speech')}>Text to Speech</button>
            <button onClick={() => navigate('/credits')}>Buy Credits</button>
            <button onClick={() => navigate('/history')}>History</button> */}
        </div>
    )
}

export default Home
