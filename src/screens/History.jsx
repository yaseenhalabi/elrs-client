import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { downloadAudio, playAudio } from '../utils/audio'
import { checkIfSignedIn } from '../utils/signin'
import LoadingScreen from '../components/loading/LoadingScreen'
export default function History() {
    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (user !== undefined) {
            checkIfSignedIn(user) 
            setLoading(false)
        }

    }, [user])
    const [history, setHistory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/user/history', { withCredentials: true })
            .then(response => {
                setHistory(response.data.history)
            })
            .catch(error => {
                console.error(error)
            });
    }, [])
    const getAudio = (id) => {
        return axios.get('http://localhost:3000/text-to-speech/' + id, { 
            withCredentials: true,
            responseType: 'blob',  // Expect a blob response (binary data)
        })
        .then(response => {
            // Create a URL for the blob data
            return response.data
        })
        .catch(error => {
            console.error(error);
            return null
        })
    }

    const getAndDownloadAudio = (id) => {
        getAudio(id)
            .then((audioFile) => {
                downloadAudio(audioFile)
            })
    }
    const getAndPlayAudio = (id) => {
        getAudio(id)
            .then((audioFile) => {
                playAudio(audioFile)
            })
    }
    if (loading) {
        return <LoadingScreen />
    }
    return (
        <div className="page-container">
            {
                user &&
                <div>
                    <div>hi {user.name}</div>
                    <div>you have {user.credits} credits</div>
                </div>
            }
            <div>
                <h2>History</h2>
                <div>
                    {
                        history && history.map(({_id, text, date_unix, history_item_id}) => {
                            return (
                                <div key={_id} className='history-item'>
                                    <div>{text}</div>
                                    <div>{date_unix}</div>
                                    <button onClick={() => getAndDownloadAudio(history_item_id)}>Download Audio</button>
                                    <button onClick={() => getAndPlayAudio(history_item_id)}>Play Audio</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
