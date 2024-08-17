import '../styles/screens/History.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { downloadAudio, playAudio } from '../utils/audio'
import { checkIfSignedIn } from '../utils/signin'
import LoadingScreen from '../components/loading/LoadingScreen'
import PlayButton from '../components/TextToSpeech/PlayButton'
import DownloadButton from '../components/TextToSpeech/DownloadButton'
export default function History() {
    const user = useSelector(state => state.user.user)
    const [loading, setLoading] = useState(true)
    const [sortMethod, setSortMethod] = useState('mostRecent')
    useEffect(() => {   
        if (user !== undefined) {
            checkIfSignedIn(user) 
            setLoading(false)
        }

    }, [user])
    const [history, setHistory] = useState([])
    let sortedHistory = []
    if (sortMethod == 'mostRecent') {
         sortedHistory = history ? history.sort((a, b) => b.date_unix - a.date_unix) : [];
    }
    else {
         sortedHistory = history ? history.sort((a, b) => a.date_unix - b.date_unix) : [];
    }

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

    const convertDateUnix = (dateUnix) => {
        const date = new Date(dateUnix * 1000)
        return date.toLocaleString()
    }
    if (loading) {
        return <LoadingScreen />
    }
    return (
        <div>
            <div className="history-page-container">
                <div className="history-container">
                    <div className="sorting-container">
                        <span>Sort By: </span>
                        <button 
                            onClick={() => setSortMethod("mostRecent")}
                            className={sortMethod == "mostRecent" ? "button-black" : "button-white"}
                        >
                            Most Recent
                        </button>
                        <button 
                            className={sortMethod == "leastRecent" ? "button-black" : "button-white"}
                            onClick={() => setSortMethod("leastRecent")}
                        >
                                Least Recent
                        </button>
                    </div>
                    <div className='history-item-list'>
                        {
                            history ? 
                            sortedHistory.map(({_id, text, date_unix, history_item_id}) => {
                                return (
                                    <div key={_id} className='history-item'>
                                        <div className='history-item-date'>{convertDateUnix(date_unix)}</div>
                                        <div className="history-item-contents">
                                            <span>{text}</span>
                                            <div className='history-item-buttons-container'>
                                                <DownloadButton onClick={() => getAndDownloadAudio(history_item_id)} />
                                                <PlayButton onClick={() => getAndPlayAudio(history_item_id)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            :
                            <div className='history-item'>
                                <span>No history items</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
