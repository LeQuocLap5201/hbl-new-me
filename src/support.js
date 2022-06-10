import { message, Upload } from "antd";
import _ from "lodash";

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Bạn chỉ được phép tải hình JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Hình ảnh phải nhỏ hơn 2MB!");
  }

  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
};

export const formatInputNumber = {
  formatter: (val) => `${val}`.replace(/\B(?=(\d{2})+(?!\d))/g, ","),
  parser: (val) => val.replace(/\$\s?|(,*)/g, ""),
};

const padTo2Digits = (number) => number.toString().padStart(2, "0");

export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:00`;
};

export const convertHourstoMinute = (strTime) => {
  let [hours, minutes] = strTime.split(":");
  return +hours * 60 + +minutes;
};

export const checkFormEditChange = (object, base) => {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (_.isArray(value)) {
        if (!_.isEqual(value, base[key])) {
          result[key] = value;
        }
      } else {
        if (!value && !base[key]) {
        } else {
          if (!_.isEqual(value, base[key])) {
            result[key] =
              !(value instanceof Date) &&
              _.isObject(value) &&
              _.isObject(base[key])
                ? changes(value, base[key])
                : value;
          }
        }
      }
    });
  }
  return changes(object, base);
};
