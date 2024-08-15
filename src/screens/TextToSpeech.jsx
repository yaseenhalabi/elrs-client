import { useSelector } from "react-redux"
import '../styles/screens/TextToSpeech.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { downloadAudio, playAudio } from '../utils/audio'
import { checkIfSignedIn } from "../utils/signin"
import LoadingScreen from '../components/loading/LoadingScreen'
import TinyLoading from '../components/loading/TinyLoading'
export default function TextToSpeech() {
    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(true)
    const [generatingSpeech, setGeneratingSpeech] = useState(false)
    const [audioFile, setAudioFile] = useState(null)
    const [text, setText] = useState('')
    
    useEffect(() => {
        if (user !== undefined) {
            checkIfSignedIn(user) 
            setLoading(false)
        }

    }, [user])


    const addCredits = () => {
            axios.post('http://localhost:3000/user/add-credits', {}, { withCredentials: true })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        });
    }

    const getAudio = () => {
        setAudioFile(null)
        setGeneratingSpeech(true)
        axios.post('http://localhost:3000/text-to-speech', { text }, {  
            withCredentials: true,
            responseType: 'blob',  // Expect a blob response (binary data)
        })
        .then(response => {
            // Create a URL for the blob data
            setAudioFile(response.data)
            setGeneratingSpeech(false)
        })
        .catch(error => {
            console.error(error);
            setGeneratingSpeech(false)
        });
    };

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className="tts-page-container">
            <div className='text-to-speech-form'>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows='5'
                    cols='50'
                    placeholder='Type anything and turn it into natural-sounding speech' 
                />
                <div className="buttons-container">
                    {generatingSpeech ? <TinyLoading /> : <button className="button-black" onClick={() => getAudio()}>Generate Speech</button>}
                    {audioFile && <div onClick={() => playAudio(audioFile)}>Play Speech</div>}
                    {audioFile && <div onClick={() => downloadAudio(audioFile)}>Download Speech</div>}
                </div>
            </div>
        </div>
    )
}