import axios from 'axios'
// http request 拦截器。发送请求拦截
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.common['Authorization'] = token;
        }
        return config;
    },
    error => {
        return error;
    }
);
// http response 拦截器，请求返回拦截
axios.interceptors.response.use(response => {
    let data = response.data
    if (data.code === 200) {
        return data.data
    }
    if (data.code === 401) {
        window.location.href = '/login'
    }
    return data
}, error => {
    return error
})