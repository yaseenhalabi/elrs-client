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
            <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ElevenLabs Resell</h1>
            {
                user ?
                <div className='nav-buttons'>
                    <a onClick={() => navigate('/text-to-speech')} style={{ cursor: 'pointer' }}>Generate Speech</a>
                    <a onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>History</a>
                    <a onClick={() => navigate('/stripe-purchase')} style={{ cursor: 'pointer' }}>Purchase Characters</a>
                    <div className='dropdown' onMouseEnter={() => setUserDropdownIsOpen(true)} onMouseLeave={() => setUserDropdownIsOpen(false)}>
                        <button className='button-white'>{user.name}</button>
                        <div className={`dropdown-content ${userDropdownIsOpen ? "open" : ""}`}>
                            <a onClick={() => signOut()} style={{ cursor: 'pointer' }}>Sign Out</a>
                        </div>
                    </div>
                </div>
                :
                <button className='button-black' onClick={() => signInWithGoogle()} style={{ cursor: 'pointer' }}>Sign In</button>
            }   
        </div>
    )
}