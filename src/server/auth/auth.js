import axios from 'axios'

export function signInWithGoogle(event) {
    event.preventDefault(); // Prevent default link behavior
    const SERVER_URI = import.meta.env.VITE_SERVER_URI 
    window.location.href = SERVER_URI + '/auth/google'
}

export function signOut() {
    const SERVER_URI = import.meta.env.VITE_SERVER_URI 
    const CLIENT_URI = import.meta.env.VITE_CLIENT_URI 
    axios.post(SERVER_URI + '/auth/sign-out', {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            document.location.href = CLIENT_URI
        })
        .catch(error => {
            console.log(error);
        });
}