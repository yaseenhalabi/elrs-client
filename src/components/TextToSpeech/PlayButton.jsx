import playIconWhite from "../../assets/icons/play-button-white.png"
import playIconBlack from "../../assets/icons/play-button-black.png"
import '../../styles/components/TextToSpeech/PlayButton.css'
import { useState } from 'react'
export default function PlayButton({ onClick }) {
    const [isBeingClicked, setIsBeingClicked] = useState(false)

    return (
        <button className={`play-button ${isBeingClicked ? "clicked" : ""}`} onClick={onClick} onMouseDown={() => setIsBeingClicked(true)} onMouseUp={() => setIsBeingClicked(false)} onMouseLeave={() => setIsBeingClicked(false)}>
            <img src={isBeingClicked ? playIconBlack : playIconWhite} alt="play icon" />
        </button>
    )
}
