import { useSelector } from "react-redux"
import '../styles/screens/TextToSpeech.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { downloadAudio, playAudio } from '../utils/audio'
export default function TextToSpeech() {

    const user = useSelector(state => state.user.user)
    const [audioFile, setAudioFile] = useState(null)
    useEffect(() => {
        console.log(user)
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
        console.log("getting audio")
        axios.post('http://localhost:3000/text-to-speech', { text }, {  
            withCredentials: true,
            responseType: 'blob',  // Expect a blob response (binary data)
        })
        .then(response => {
            // Create a URL for the blob data
            setAudioFile(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    };

    

    const [text, setText] = useState('')
    return (
        <div className="page-container">
            {
                user &&
                <div>
                    <div>hi {user.name}</div>
                    <div>you have {user.credits} credits</div>
                    <button onClick={() => addCredits()}>Add 100 credits</button>
                </div>
            }
            <div className='text-to-speech-form'>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows='5'
                    cols='50'
                    placeholder='Type anything and turn it into natural-sounding speech' 
                />
                <button onClick={() => getAudio(audioFile)}>Generate Speech</button>
                <button onClick={() => playAudio(audioFile)}>Play Speech</button>
                <button onClick={() => downloadAudio}>Download Speech</button>
            </div>
        </div>
    )
}