/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HistoryItem from "../components/HistoryItem";
import Info from "../components/Info";
import { normFile, beforeUpload, formatInputNumber } from "../support";

export default function Home() {
  const [ellipsis, setEllipsis] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [isModalUpdate, setModalUpdate] = useState(false);
  const [isModalHistory, setModalHistory] = useState(false);

  return (
    <>
      <div className="info-home container">
        <Info />
        <div className="home-card__content">
          <div className="home-card__title">
            <h3>Giới thiệu về chương trình</h3>
            <h3>New me - Thách thức tôi</h3>
          </div>
          <Typography.Paragraph
            style={{ marginBottom: 0 }}
            ellipsis={
              ellipsis
                ? {
                    rows: 4,
                    symbol: "more",
                  }
                : false
            }
          >
            <p>
              Khi tham gia chương trình New Me - Thách Thức Tôi, Thành viên sẽ
              được:
            </p>
            <ol>
              <li>Ghi nhận kết quả tham gia</li>
              <li>Giấy chứng nhận</li>
              <li>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </li>
              <li>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet. Amet minim
                mollit non deserunt{" "}
              </li>
            </ol>
            <p>Exercitation veniam consequat sunt nostrud amet.</p>
          </Typography.Paragraph>
          {ellipsis && (
            // <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            //   <Button
            //     onClick={() => {
            //       setEllipsis(false);
            //     }}
            //   >
            //     Xem chi tiết
            //   </Button>
            // </Space>
            <Space
              style={{ justifyContent: "center", width: "100%", marginTop: 20 }}
            >
              <span
                style={{ color: "#1890FF", fontStyle: "italic", fontSize: 14 }}
                onClick={() => {
                  setEllipsis(false);
                }}
              >
                Xem chi tiết
              </span>
            </Space>
          )}

          {!ellipsis && (
            <Space style={{ justifyContent: "center", width: "100%" }}>
              <span
                style={{ color: "#1890FF", fontStyle: "italic", fontSize: 14 }}
                onClick={() => {
                  setEllipsis(true);
                }}
              >
                Thu gọn
              </span>
            </Space>
          )}
        </div>
      </div>
      {!isAgree && (
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 70,
            marginBottom: 20,
          }}
        >
          <Button
            className="btn-agree"
            onClick={() => {
              setIsAgree(true);
            }}
          >
            Tôi đồng ý tham gia chương trình
          </Button>
        </Space>
      )}
      {isAgree && (
        <div className="list-btn container">
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalUpdate(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/update.png 2x" alt="icon" />
            </div>
            Cập nhật hoạt động
          </Button>
          <Link to="ranks">
            <Button block className="btn-primary">
              <div className="btn-icon">
                <img srcSet="/img/ranks.png 2x" alt="icon" />
              </div>
              Bảng xếp hạng
            </Button>
          </Link>
          <Button
            block
            className="btn-primary"
            onClick={() => {
              setModalHistory(true);
            }}
          >
            <div className="btn-icon">
              <img srcSet="/img/history.png 2x" alt="icon" />
            </div>
            Lịch sử cập nhật
          </Button>
          <Link to="gift">
            <Button block className="btn-primary">
              <div className="btn-icon">
                <img srcSet="/img/gift.png 2x" alt="icon" />
              </div>
              Quà của tôi
            </Button>
          </Link>
          <Link to="energy">
            <Button block className="btn-primary">
              <div className="btn-icon">
                <img srcSet="/img/energy.png 2x" alt="icon" />
              </div>
              Lan tỏa năng lượng
            </Button>
          </Link>
        </div>
      )}
      <Drawer
        className="drawer-update"
        title="Cập nhật hoạt động"
        placement="bottom"
        onClose={() => {
          setModalUpdate(false);
        }}
        visible={isModalUpdate}
      >
        <Form className="form-update" layout="vertical">
          <Form.Item name="weight" label="Cân nặng (kg)">
            <InputNumber
              min={1}
              placeholder="Cân nặng"
              addonAfter={<img srcSet="/img/weight.png 2x" />}
            />
          </Form.Item>
          <Form.Item name="height" label="Chiều cao (cm)">
            <InputNumber
              min={1}
              placeholder="Chiều cao"
              addonAfter={<img srcSet="/img/height.png 2x" />}
            />
          </Form.Item>
          <Form.Item name="type" label="Loại hoạt động">
            <Select placeholder="Loại hoạt động" allowClear>
              <Select.Option value={1}>Nhảy dây</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="time" label="Thời gian hoạt động (phút)">
            <InputNumber min={1} placeholder="Thời gian hoạt động" />
          </Form.Item>
          <Form.Item name="met" label="MET">
            <InputNumber min={1} placeholder="MET" {...formatInputNumber} />
          </Form.Item>
          <Form.Item name="distance" label="Khoảng cách">
            <InputNumber min={1} placeholder="Khoảng cách" />
          </Form.Item>
          <Form.Item name="calo" label="Lượng Kcal tiêu hao">
            <InputNumber min={1} placeholder="Lượng Kcal tiêu hao" />
          </Form.Item>
          <Form.Item name="fat" label="Mỡ (%)">
            <InputNumber min={1} placeholder="Mỡ" />
          </Form.Item>
          <Form.Item name="amountOfBone" label="Lượng xương">
            <InputNumber min={1} placeholder="Lượng xương" />
          </Form.Item>
          <Form.Item name="visceralFat" label="Mỡ nội tạng">
            <InputNumber min={1} placeholder="Mỡ nội tạng" />
          </Form.Item>
          <Form.Item name="chcb" label="CHCB (RMR)">
            <InputNumber min={1} placeholder="CHCB" />
          </Form.Item>
          <Form.Item name="muscleMass" label="Lượng cơ bắp">
            <InputNumber
              min={1}
              placeholder="Lượng cơ bắp"
              {...formatInputNumber}
            />
          </Form.Item>
          <Form.Item name="bmi" label="Chỉ số cân đối">
            <InputNumber min={1} placeholder="Chỉ số cân đối" />
          </Form.Item>
          <Form.Item name="water" label="Nước (%)">
            <InputNumber min={1} placeholder="Nước" />
          </Form.Item>
          <Form.Item name="atUpdated" label="Ngày cập nhật">
            <DatePicker placeholder="Ngày cập nhật" format="DD/MM/YYYY" />
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
              justifyContent: "center",
              marginBottom: 30,
              marginTop: 40,
            }}
          >
            <Button htmlType="submit" className="btn-submit">
              Cập nhật
            </Button>
          </Space>
        </Form>
      </Drawer>
      <Drawer
        className="drawer-update drawer-history"
        title="Lịch sử cập nhật"
        placement="bottom"
        onClose={() => {
          setModalHistory(false);
        }}
        visible={isModalHistory}
      >
        <Collapse
          accordion
          className="history-collapse"
          expandIconPosition="right"
        >
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày 01/07/2022 <img srcSet="/img/edit.png 2x" />
              </div>
            }
            key="1"
          >
            <HistoryItem />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày 03/07/2022 <img srcSet="/img/edit.png 2x" />
              </div>
            }
            key="2"
          >
            <HistoryItem />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày 05/07/2022 <img srcSet="/img/edit.png 2x" />
              </div>
            }
            key="3"
          >
            <HistoryItem />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày 07/07/2022 <img srcSet="/img/edit.png 2x" />
              </div>
            }
            key="4"
          >
            <HistoryItem />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày 09/07/2022 <img srcSet="/img/edit.png 2x" />
              </div>
            }
            key="5"
          >
            <HistoryItem />
          </Collapse.Panel>
        </Collapse>
      </Drawer>
    </>
  );
}
