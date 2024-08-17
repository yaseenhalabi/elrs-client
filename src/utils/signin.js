export const checkIfSignedIn = (condition) => {
    const SERVER_URI = import.meta.env.VITE_SERVER_URI
    if (!condition) {
        document.location.href = SERVER_URI + '/auth/google'
        return null
    }
}

