import axiosClient from "./axiosClient";

export const apiBookingList = async () => {
    const {data} = await axiosClient.get("/dat-phong");
    return data;
};

export const apiBookingUser = async (id) => {
    const {data} = await axiosClient.get(`/dat-phong/lay-theo-nguoi-dung/${id}`);
    return data;
};

export const apiDeleteBookingUser = async (id) => {
    const {data} = await axiosClient.delete(`/dat-phong/${id}`);
    return data;
};

export const apiUpdateBookingUser = async (value) => {
    const {data} = await axiosClient.put(`/dat-phong/${value.id}`, value);
    return data;
};