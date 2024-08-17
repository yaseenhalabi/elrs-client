import downloadIconWhite from "../../assets/icons/download-icon-white.png"
import downloadIconBlack from "../../assets/icons/download-icon-black.png"
import '../../styles/components/TextToSpeech/DownloadButton.css'
import { useState } from 'react'
export default function DownloadButton({ onClick }) {
    const [isBeingClicked, setIsBeingClicked] = useState(false)
    return (
        <button className={`download-button ${isBeingClicked ? "clicked" : ""}`} onClick={onClick} onMouseDown={() => setIsBeingClicked(true)} onMouseUp={() => setIsBeingClicked(false)} onMouseLeave={() => setIsBeingClicked(false)}>
            <img src={isBeingClicked ? downloadIconBlack : downloadIconWhite} alt="play icon" />
        </button>   
    )
}
