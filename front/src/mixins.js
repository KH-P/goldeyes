import axios from "axios";

if (process.env.NODE_ENV != null && process.env.NODE_ENV == 'development'){
    axios.defaults.baseURL = "http://192.168.0.8:8080";
}
else axios.defaults.baseURL = "http://132.226.173.98:8080";
axios.defaults.baseURL = "http://132.226.173.98:8080";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

export default {
    methods: {
        async $api(url, data) {
            return (await axios({
                method: 'post',
                url,
                data
            }).catch(e => {
                console.log(e);
            })).data;
        },
        async $api_get(url) {
            return (await axios({
                method: 'get',
                url
            }).catch(e => {
                console.log(e);
            })).data;
        }
    }
}