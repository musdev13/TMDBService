export const clearSessionData = () => {
    localStorage.removeItem('tmdb_session_id');
    localStorage.removeItem('username');
};