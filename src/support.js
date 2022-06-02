import { message } from "antd";

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const formatInputNumber = {
  formatter: (val) => `${val}`.replace(/\B(?=(\d{2})+(?!\d))/g, ","),
  parser: (val) => val.replace(/\$\s?|(,*)/g, ""),
};
