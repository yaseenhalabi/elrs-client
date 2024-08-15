import axios from 'axios'

export function signInWithGoogle() {
    document.location.href = 'http://localhost:3000/auth/google'
}

export function signOut() {
    axios.post('http://localhost:3000/auth/sign-out', {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            document.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
}