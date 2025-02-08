export const getToken =  () => {
    const token =  localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return token;
}