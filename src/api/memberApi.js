import axiosClient from "./axiosClient";

const memberApi = {
  getMe() {
    const url = "member/members/me";
    return axiosClient.get(url);
  },

  memberAccept() {
    const url = "member/auth/accept";
    return axiosClient.get(url);
  },

  uploadImage(data) {
    const url = "member/uploads";
    return axiosClient.post(url, data);
  },

  addHealInfo(data) {
    const url = "member/newmehealth";
    return axiosClient.post(url, data);
  },

  getListHistory() {
    const url = "member/newmehealth/title";
    return axiosClient.get(url);
  },

  getHealInfoById(id) {
    const url = `member/newmehealth/${id}`;
    return axiosClient.get(url);
  },

  updateHealInfo({ id, data }) {
    const url = `member/newmehealth/${id}`;
    return axiosClient.patch(url, data);
  },
};

export default memberApi;
