const resolve_base_url = () => {
    // let base_url = "http://127.0.0.1:8000/api/v1";
    let base_url = "http://178.62.1.20:8000/api/v1";

    const baseURL = window.localStorage.getItem('baseURL');
    baseURL && (base_url = baseURL);

    return base_url;
}
export const BASE_CLOUDINARY_URL = "https://res.cloudinary.com/elmonstro/";
export default resolve_base_url;
export const sockets_url = "ws://144.126.192.148:8000/ws";
// export const sockets_url = "ws://127.0.0.1:8000/ws";