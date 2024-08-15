import '../styles/screens/Home.css'
import { signInWithGoogle } from '../server/auth/auth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const getStarted = () => {
        if (user) {
            navigate('/text-to-speech')
        } else {
            signInWithGoogle()
            navigate('/text-to-speech')
        }
    }
    return (
        <div className='home-page-container'>
            <div className='header-container'>
                <h1>Use ElevenLabs at a discount</h1>
                <h3>No subscription, you pay for what you need</h3>
                <button onClick={getStarted}>Get Started</button>
            </div>
            <div className='price-comparison-section'>
                <div className='price-comparison-container'>
                    <div className='price-title'>Their Prices</div>
                    <div className='price-comparison'>
                        <div className='payment-option'>
                            <div className='amount'><span>$5</span>/mo</div>
                            <div>30k Characters/mo</div>
                            <div><strong>$0.166</strong> per 1k Characters</div>
                        </div>
                        <div className='payment-option'>
                            <div className='amount'><span>$22</span>/mo</div>
                            <div>100k Characters/mo</div>
                            <div><strong>$0.220</strong> per 1k Characters</div>
                        </div>
                        <div className='payment-option'>
                            <div className='amount'><span>$99</span>/mo</div>
                            <div>500k Characters/mo</div>
                            <div><strong>$0.198</strong> per 1k Characters</div>
                        </div>
                    </div>
                </div>
                <div className='price-comparison-container'>
                    <div className='price-title'>Our Prices</div>
                    <div className='price-comparison'>
                        <div className='payment-option'>
                            <div className='amount'><span>$5</span></div>
                            <div>55k Characters</div>
                            <div><strong>$0.09</strong> per 1k Characters</div>
                        </div>
                        <div className='payment-option'>
                            <div className='amount'><span>$22</span></div>
                            <div>244k Characters</div>
                            <div><strong>$0.09</strong> per 1k Characters</div>
                        </div>
                        <div className='payment-option'>
                            <div className='amount'><span>$99</span></div>
                            <div>1100k Characters</div>
                            <div><strong>$0.09</strong> per 1k Characters</div>
                        </div>
                    </div>
                    <div className='footnote'>These numbers are for comparison. You may purchase anywhere from 10k-10000k characters depending on your needs.</div>
                </div>
            </div>
        </div>
    )
}

