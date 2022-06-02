/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Button, Form, InputNumber, Space, Upload } from "antd";
import { normFile, beforeUpload } from "../support";

HistoryItem.propTypes = {
  data: PropTypes.any,
};

function HistoryItem({ data }) {
  return (
    <Form className="form-update" layout="vertical">
      <Form.Item name="weight" label="Cân nặng">
        <InputNumber min={1} placeholder="Cân nặng" />
      </Form.Item>
      <Form.Item name="height" label="Chiều cao">
        <InputNumber min={1} placeholder="Chiều cao" />
      </Form.Item>
      <Form.Item name="waist" label="Vòng eo">
        <InputNumber min={1} placeholder="Vòng eo" />
      </Form.Item>
      <Form.Item name="buttocks" label="Vòng mông">
        <InputNumber min={1} placeholder="Vòng mông" />
      </Form.Item>
      <Form.Item name="calo" label="Lượng Kcal tiêu hao">
        <InputNumber min={1} placeholder="Lượng Kcal tiêu hao" />
      </Form.Item>
      <Form.Item name="fat" label="Mỡ (%)">
        <InputNumber min={1} placeholder="Mỡ" />
      </Form.Item>
      <Form.Item
        name="pictures"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          maxCount={1}
          beforeUpload={beforeUpload}
        >
          <Button
            className="btn-upload"
            icon={<img srcSet="/img/upload.png 2x" />}
          >
            Thêm ảnh
          </Button>
        </Upload>
      </Form.Item>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 30,
          marginTop: 25,
          padding: "0 10px",
          flexWrap: "wrap",
        }}
      >
        <Button style={{ minWidth: 130 }} className="btn-submit">
          Xóa
        </Button>
        <Button
          style={{ minWidth: 130 }}
          htmlType="submit"
          className="btn-submit"
        >
          Lưu
        </Button>
      </Space>
    </Form>
  );
}

export default HistoryItem;
