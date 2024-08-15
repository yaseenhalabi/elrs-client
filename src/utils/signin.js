export const checkIfSignedIn = (condition) => {
    if (!condition) {
        document.location.href = 'http://localhost:3000/auth/google'
        return null
    }
}

