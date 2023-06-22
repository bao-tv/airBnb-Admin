import axiosClient from "./axiosClient";

export const apiAllRoomList = async () => {
    const {data} = await axiosClient.get("/phong-thue");
    return data;
};

export const apiRoomList = async (value) => {
    const {data} = await axiosClient.get(`/phong-thue/phan-trang-tim-kiem?pageIndex=${value}&pageSize=10`);
    return data;
};

export const apiRoomId = async (id) => {
    const {data} = await axiosClient.get(`/phong-thue/${id}`);
    return data;
};

// ============== Room add, update, delete, upload img================
export const apiDeleteRoom = async (id) => {
    const {data} = await axiosClient.delete(`/phong-thue/${id}`);
    return data;
};

export const apiUpdateRoom = async (value) => {
    // console.log(value);
    const {data} = await axiosClient.put(`/phong-thue/${value.id}`, value);
    return data;
};

export const apiAddRoom = async (value) => {
    // console.log(value);
    const {data} = await axiosClient.post('/phong-thue', value);
    return data;
};

export const apiUpdateImgRoom = async (file, id) => {
    const formData = new FormData();
    formData.append('formFile', file[0]);
    const {data} = await axiosClient.post(`/phong-thue/upload-hinh-phong?maPhong=${id}`, formData);
    return data;
};

// =========== Location add, update, delete, upload img ========
export const apiLocation = async (id) => {
    // console.log(id);
    const {data} = await axiosClient.get(`/vi-tri/${id ? id : ""}`);
    return data;
};

export const apiDeleteLocation = async (id) => {
    const {data} = await axiosClient.delete(`/vi-tri/${id}`);
    return data;
};

export const apiUpdateLocation = async (value) => {
    const {data} = await axiosClient.put(`/vi-tri/${value.id}`, value);
    return data;
};

export const apiUpdateIMGLocation = async (file, id) => {
    const formData = new FormData();
    formData.append('formFile', file[0]);
    const {data} = await axiosClient.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData);
    return data;
};

export const apiAddLocation = async (value) => {
    const {data} = await axiosClient.post('/vi-tri', value);
    return data;
};



