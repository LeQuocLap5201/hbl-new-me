import axiosClient from "./axiosClient";

const memberApi = {
  getMe() {
    const url = "/member/new-me-member/me";
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
    const url = "member/new-me-health";
    return axiosClient.post(url, data);
  },

  getListHistory(idRace) {
    const url = `member/new-me-health/title?race_id=${idRace}`;
    return axiosClient.get(url);
  },

  getHealInfoById(id) {
    const url = `member/new-me-health/${id}`;
    return axiosClient.get(url);
  },

  updateHealInfo({ id, data }) {
    const url = `member/new-me-health/${id}`;
    return axiosClient.patch(url, data);
  },

  getListRace() {
    const url = "member/race";
    return axiosClient.get(url);
  },

  getRaceDetail() {
    const url = "member/race/detail";
    return axiosClient.get(url);
  },
};

export default memberApi;
