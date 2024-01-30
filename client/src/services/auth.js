const setAuthToken = token => {
    localStorage.setItem('jwtToken', token);
};

const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
};

const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
};

const logout = () => {
    localStorage.removeItem('jwtToken');
};

export { setAuthToken, getAuthToken, isAuthenticated, logout };