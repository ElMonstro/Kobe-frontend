const resolve_base_url = () => {
    const base_url = "http://127.0.0.1:8000/api/v1";
    // const base_url = "http://bsc-kobe.herokuapp.com/api/v1";

    return base_url;
}
export const base_cloudinary_url = "https://res.cloudinary.com/elmonstro/";
export default resolve_base_url;
// export const sockets_url = "wss://bsc-kobe.herokuapp.com/ws";
export const sockets_url = "ws://127.0.0.1:8000/ws";

