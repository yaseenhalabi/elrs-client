import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function History() {
    const user = useSelector(state => state.user.user)
    const [history, setHistory] = useState([])
    console.log(history)

    useEffect(() => {
        axios.get('http://localhost:3000/user/history', { withCredentials: true })
            .then(response => {
                setHistory(response.data.history)
            })
            .catch(error => {
                console.error(error)
            });
    }, [])
    


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
                        history.map((item) => {
                            return (
                                <div key={item.id} className='history-item'>
                                    <div>{item.text}</div>
                                    <div>{item.date_unix}</div>
                                    <button>Download Audio</button>
                                    <button>Play Audio</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
