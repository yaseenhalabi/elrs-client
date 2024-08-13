

export const downloadAudio = (audioFile) => {
    if (!audioFile) {
        return;
    }
    const url = window.URL.createObjectURL(new Blob([audioFile]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.mp3'); // Specify the filename
    document.body.appendChild(link);
    link.click();
    link.remove(); // Remove the link from the document
}
export const playAudio = (audioFile) => {
    if (!audioFile) {
        return;
    }
    const audio = new Audio(URL.createObjectURL(new Blob([audioFile])));
    audio.play();
}