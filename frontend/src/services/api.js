import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
}, { withCredentials: true });

export const apiConnector = async (method, url, data = {}, headers, config = {}) => {
    let realheaders = {
        Authorization: `Bearer ${headers}`,
    }
    try {
        const response = await api.request({
            method,
            url,
            data,
            headers: realheaders,
            ...config
        });
        return response;
    }
    catch (error) {
        console.error("API Error:", error);
        throw error;
    }
    // return api({
    // method,
    // url,
    // data,
    // headers: realheaders,
    // ...config
    // });
};
export default api;
