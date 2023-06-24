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

export const apiListUser = async () => {
    const data = await axiosClient.get("/users");
    return data;
}

export const apiRemoveUser = async (id) => {
    const data = await axiosClient.delete(`/users?id=${id}`);
    return data;
}

export const apiUpdateImgUser = async (file) => {
    console.log(file?.hinhAnh[0]);
    const formData = new FormData();
    formData?.append('formFile', file?.hinhAnh[0]);
    console.log(formData);
    const {data} = await axiosClient.post('/users/upload-avatar', formData);
    return data;
};
