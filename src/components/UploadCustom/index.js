/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Spin, Upload } from "antd";
import { beforeUpload, normFile } from "../../support";
import memberApi from "../../api/memberApi";
import "./index.css";

UploadCustom.propTypes = {
  isDetail: PropTypes.bool,
  listDetail: PropTypes.any,
  uploadChange: PropTypes.func,
  nameField: PropTypes.string,
  valueChange: PropTypes.any,
  handleValueChange: PropTypes.func,
};

UploadCustom.defaultProps = {
  isDetail: false,
  listDetail: [],
  uploadChange: null,
  nameField: "images",
  valueChange: {},
  handleValueChange: null,
};

function UploadCustom({
  nameField,
  uploadChange,
  isDetail,
  listDetail,
  valueChange,
  handleValueChange,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [listImages, setListImages] = useState(() =>
    isDetail ? listDetail : {}
  );
  const [listUploadDetail, setListUploadDetail] = useState({});
  const uIdCurrent = useRef();

  const handleUploadChange = useCallback(
    (info) => {
      setIsSpinning(true);
      if (info.file.status === "uploading") {
        info.file.status = "done";
        uIdCurrent.current = info?.file?.uid;
        setListImages(info?.fileList);
        if (isDetail) {
          if (!handleValueChange) {
            return;
          }
          return handleValueChange({ ...valueChange, images: "change" });
        }
      }
      if (info.file.status === "removed") {
        if (isDetail) {
          setListImages(info?.fileList);
        }
        setIsSpinning(false);
      }
    },
    [handleValueChange, isDetail, valueChange]
  );

  const uploadImage = async (options) => {
    const { file } = options;
    const fmData = new FormData();
    fmData.append("File", file);
    try {
      const { data } = await memberApi.uploadImage(fmData);
      setIsSpinning(false);
      if (isDetail) {
        setListUploadDetail({
          ...listUploadDetail,
          [uIdCurrent.current]: data?.data,
        });
      } else {
        setListImages({
          ...listImages,
          [uIdCurrent.current]: data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (info) => {
    if (!isDetail) {
      const newListImages = { ...listImages };
      delete newListImages[info?.uid];
      setListImages(newListImages);
    }
    if (isDetail) {
      if (!handleValueChange) {
        return;
      }
      return handleValueChange({ ...valueChange, images: "change" });
    }
  };

  useEffect(() => {
    if (!uploadChange) {
      return;
    }
    if (isDetail) {
      return uploadChange(listImages, listUploadDetail);
    } else {
      return uploadChange(listImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listImages, listUploadDetail]);

  const showBtnUpload = () => {
    if (isDetail) {
      if (listDetail?.length >= 5) {
        return "none";
      } else {
        return "block";
      }
    } else {
      if (Object.values(listImages)?.length >= 5) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  return (
    <Form.Item
      name={nameField}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        className="hbl-upload"
        customRequest={uploadImage}
        listType="picture"
        maxCount={5}
        beforeUpload={beforeUpload}
        accept=".png, .jpeg, .jpg"
        onChange={handleUploadChange}
        onRemove={handleRemove}
        showUploadList={{ removeIcon: <img src="/img/close.svg" /> }}
      >
        <Spin spinning={isSpinning}>
          <Button
            disabled={isSpinning}
            className="btn-upload"
            icon={<img srcSet="/img/upload.png 2x" />}
            style={{ display: showBtnUpload() }}
          >
            Thêm ảnh
          </Button>
        </Spin>
        <div style={{ display: showBtnUpload() }}>
          <span style={{ marginLeft: 10, color: "#FF0000" }}>(*) </span>
          <span style={{ color: "#979797" }}>Tối đa 5 ảnh</span>
        </div>
      </Upload>
    </Form.Item>
  );
}

export default UploadCustom;
