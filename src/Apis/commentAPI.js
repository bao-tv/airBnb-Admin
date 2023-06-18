import axiosClient from "./axiosClient";

export const apiAllCommentList = async (id) => {
    const {data} = await axiosClient.get("/binh-luan");
    return data;
};

// export const apiCommentList = async (id) => {
//     const data = null;
//     if(id) {data = await axiosClient.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`)} else {data = await axiosClient.get("/binh-luan")}
//     return data?.content;
// };

export const apiDeleteComment = async (id) => {
    const {data} = await axiosClient.delete(`/binh-luan/${id}`);
    return data;
};

export const apiUpdateComment = async (value) => {
    const {data} = await axiosClient.put(`/binh-luan/${value.id}`, value);
    return data;
};