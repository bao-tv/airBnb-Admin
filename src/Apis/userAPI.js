import axiosClient from "./axiosClient";

export const apiSignIn = async (value) => {
    const {data} = await axiosClient.post('/auth/signin', value);
    return data;
};

export const apiSignUp = async (value) => {
    const {data} = await axiosClient.post('/auth/signup', value);
    return data;
};


// update info user
export const apiUpdateInfoUser = async (value) => {
    const data  = await axiosClient.put(`/users/${value.id}`, value);
    return data;
};

export const apiListUser = async (value) => {
    const data = await axiosClient.get(`/users/phan-trang-tim-kiem?pageIndex=${value}&pageSize=10`);
    return data;
}

export const apiRemoveUser = async (id) => {
    const data = await axiosClient.delete(`/users?id=${id}`);
    return data;
}
