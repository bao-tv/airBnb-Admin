import axios from "axios";
import Swal from 'sweetalert2';

const user = JSON.parse(localStorage.getItem("user"));

const axiosClient = axios.create({
    baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
    headers: {
        tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NjAzMjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk2MTc5NjAwfQ.i6JqYnGkwyHl6dkDHnjFWbPfBEl2l4SXAp4r7h9Ecpw",
        token : user?.token,
    },
});
  
  export default axiosClient;
