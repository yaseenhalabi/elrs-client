import '../../styles/components/Navigation/Navbar.css'
import { useSelector } from 'react-redux'
import { signInWithGoogle, signOut } from '../../server/auth/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
    const user = useSelector(state => state.user.user)
    const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div className='navbar'>
            <h1 onClick={() => navigate('/')}>ElevenLabs Resell</h1>
            {
                user ?
                <div className='nav-buttons'>
                    <a onClick={() => navigate('/text-to-speech')}>Generate Speech</a>
                    <a onClick={() => navigate('/history')}>History</a>
                    <a onClick={() => navigate('/credits')}>Purchase Characters</a>
                    <div className='dropdown' onMouseEnter={() => setUserDropdownIsOpen(true)} onMouseLeave={() => setUserDropdownIsOpen(false)}>
                        <button className='button-white'>{user.name}</button>
                        <div className={`dropdown-content ${userDropdownIsOpen ? "open" : ""}`}>
                            <a onClick={() => signOut()}>Sign Out</a>
                        </div>
                    </div>
                </div>
                :
                <button className='button-black' onClick={() => signInWithGoogle()}>Sign In</button>
            }   
        </div>
    )
}