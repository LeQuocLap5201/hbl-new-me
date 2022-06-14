/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  InputNumber,
  message,
  notification,
  Space,
  Modal,
  Progress,
} from "antd";
import {
  checkFormEditChange,
  convertHourstoMinute,
  formatInputNumber,
  toHoursAndMinutes,
} from "../support";
import UploadCustom from "./UploadCustom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import memberApi from "../api/memberApi";
import Hourglass from "./Hourglass";

FormHeal.propTypes = {
  isDetail: PropTypes.bool,
  idDetail: PropTypes.number,
  FnShow: PropTypes.func,
  form: PropTypes.any,
};

FormHeal.defaultProps = {
  isDetail: false,
  idDetail: null,
  FnShow: null,
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Cảnh báo",
    description: "Mỗi ngày chỉ được cập nhật hoạt động một lần",
    placement: "top",
  });
};

function FormHeal({ isDetail, idDetail, FnShow, form }) {
  const formDefault = useRef();
  const [formChange, setFormChange] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow();
  };

  const [listImages, setListImages] = useState();
  const handleImageChange = (val, listUpload) => {
    if (isDetail) {
      const newList = val?.map((obj) => {
        if (typeof obj === "object") {
          if (obj["url"]) {
            return obj?.url;
          } else {
            return listUpload[obj?.uid];
          }
        } else {
          return obj;
        }
      });
      setListImages(newList);
    } else {
      setListImages(val);
    }
  };

  const { isLoading } = useQuery(
    ["history", idDetail],
    async () => {
      const { data } = await memberApi.getHealInfoById(idDetail);
      return data?.item;
    },
    {
      enabled: !!idDetail,
      onSuccess: (data) => {
        form.setFieldsValue({
          ...data,
          time: convertHourstoMinute(data?.time),
          images:
            data?.images?.length !== 0
              ? data?.images?.map((img) => ({ url: img }))
              : [],
        });

        formDefault.current = {
          ...data,
          time: convertHourstoMinute(data?.time),
          images:
            data?.images?.length !== 0
              ? data?.images?.map((img) => ({ url: img }))
              : [],
        };

        setIsDisabled(!data?.is_update);
        setListImages(data?.images?.length !== 0 ? data?.images : []);
      },
    }
  );

  const queryClient = useQueryClient();
  const update = useMutation(memberApi.updateHealInfo, {
    onSuccess: (data, variables) => {
      console.log("data: ", data.data?.item);
      setFormChange({});
      queryClient.setQueryData(["history", variables.id], data.data?.item);
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật không thành công");
    },
  });
  const create = useMutation(memberApi.addHealInfo, {
    onSuccess: () => {
      form?.resetFields();
      message.success("Cập nhật hoạt động thành công");
      closeDrawer();
    },
    onError: (error) => {
      if (error?.response?.data?.statusCode === 409) {
        openNotificationWithIcon("warning");
      } else {
        message.error("Cập nhật hoạt động không thành công");
      }
      closeDrawer();
    },
  });

  // Check Form Change
  const handleValuesChange = (changedValues, allValues) => {
    const isChange = checkFormEditChange(allValues, formDefault.current);
    delete isChange["images"];
    setFormChange((prev) => {
      if (prev["images"]) {
        return { images: "change", ...isChange };
      } else {
        return { ...isChange };
      }
    });
  };

  // Calculate BMI
  const calculateBmi = () => {
    let h = form?.getFieldValue("height");
    let w = form?.getFieldValue("weight");
    if (h && 2) {
      let bmi = w / Math.pow(h / 100, 2);
      let result = Math.round(bmi * 100) / 100;
      let formCurrent = form?.getFieldsValue();
      form?.setFieldsValue({ ...formCurrent, bmi: result });
    }
  };

  const handleUploadChange = (val) => {
    setFormChange(val);
  };

  const modalAccept = (callback, data) => {
    let secondsToGo = 0;
    let countDown = 5;
    const modal = Modal.confirm({
      className: "modal-accept",
      width: 300,
      icon: null,
      okText: "Đồng ý",
      cancelText: "Hủy",
      title: "Bạn có chắc chắn muốn cập nhật ?",
      content: (
        <Progress
          type="circle"
          percent={20}
          format={(percent) => `${percent / 20}s`}
          width={40}
          strokeColor="#000"
          strokeWidth={10}
        />
      ),
      maskClosable: true,
      onOk() {
        clearInterval(timer);
        clearTimeout(timeOut);
        callback(data);
      },
      onCancel() {
        clearInterval(timer);
        clearTimeout(timeOut);
      },
    });

    const timer = setInterval(() => {
      secondsToGo += 1;
      countDown -= 1;
      if (countDown !== 0) {
        modal.update({
          content: (
            <Progress
              type="circle"
              percent={(secondsToGo + 1) * 20}
              format={(percent) => `${percent / 20}s`}
              width={40}
              strokeColor="#000"
              strokeWidth={10}
            />
          ),
        });
      }
    }, 1000);

    const timeOut = setTimeout(() => {
      clearInterval(timer);
      callback(data);
      modal.destroy();
    }, countDown * 1000);
  };

  // Submit
  const onFinish = async (val) => {
    if (isDetail) {
      const newVal = {
        ...val,
        bmi: undefined,
        time: val?.time ? toHoursAndMinutes(val?.time) : undefined,
        images:
          listImages.length !== 0
            ? listImages?.map((img) => {
                let newImg;
                if (typeof img === "object") {
                  if (img["url"]) {
                    newImg = img?.url;
                  }
                } else {
                  newImg = img;
                }
                return newImg;
              })
            : undefined,
      };
      const data = JSON.parse(JSON.stringify(newVal));
      modalAccept(update.mutate, { id: idDetail, data: data });
    } else {
      if (Object.values(listImages).length !== 0) {
        const newVal = {
          ...val,
          bmi: undefined,
          time: val?.time ? toHoursAndMinutes(val?.time) : undefined,
          images:
            Object.values(listImages).length !== 0
              ? Object.values(listImages)
              : undefined,
        };
        const data = JSON.parse(JSON.stringify(newVal));
        modalAccept(create.mutate, data);
      } else {
        message.warning("Bạn phải chọn ít nhất một ảnh");
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Hourglass />
      </div>
    );
  }

  return (
    <Form
      form={form}
      onValuesChange={isDetail ? handleValuesChange : null}
      onFinish={onFinish}
      className="form-update"
      layout="vertical"
    >
      <Form.Item
        name="weight"
        label="Cân nặng (kg)"
        rules={[{ required: true, message: "Vui lòng nhập cân nặng" }]}
      >
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Cân nặng"
          addonAfter={<img srcSet="/img/weight.png 2x" />}
          onChange={calculateBmi}
        />
      </Form.Item>
      <Form.Item
        inputMode="numeric"
        name="height"
        label="Chiều cao (cm)"
        rules={[{ required: true, message: "Vui lòng nhập chiều cao" }]}
      >
        <InputNumber
          disabled={isDisabled}
          {...formatInputNumber}
          min={1}
          placeholder="Chiều cao"
          addonAfter={<img srcSet="/img/height.png 2x" />}
          onChange={calculateBmi}
        />
      </Form.Item>
      <Form.Item name="bmi" label="BMI">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="BMI"
          readOnly
        />
      </Form.Item>
      {/* <Form.Item name="type" label="Loại hoạt động">
          <Select placeholder="Loại hoạt động" allowClear>
            <Select.Option value={1}>Nhảy dây</Select.Option>
          </Select>
        </Form.Item> */}
      <Form.Item name="time" label="Thời gian hoạt động (phút)">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Thời gian hoạt động"
        />
      </Form.Item>
      {/* <Form.Item name="met" label="MET">
          <InputNumber min={1} placeholder="MET" {...formatInputNumber} />
        </Form.Item> */}
      {/* <Form.Item name="distance" label="Khoảng cách">
          <InputNumber min={1} placeholder="Khoảng cách" />
        </Form.Item> */}
      {/* <Form.Item name="calo" label="Lượng Kcal tiêu hao">
          <InputNumber min={1} placeholder="Lượng Kcal tiêu hao" />
        </Form.Item> */}
      <Form.Item name="fat_percentage" label="Mỡ (%)">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Mỡ"
        />
      </Form.Item>
      <Form.Item name="amount_of_bones" label="Lượng xương">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Lượng xương"
        />
      </Form.Item>
      <Form.Item name="visceral_fat" label="Mỡ nội tạng">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Mỡ nội tạng"
        />
      </Form.Item>
      <Form.Item name="chcb" label="CHCB (RMR)">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="CHCB"
        />
      </Form.Item>
      <Form.Item name="amount_of_muscle" label="Lượng cơ bắp">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Lượng cơ bắp"
          {...formatInputNumber}
        />
      </Form.Item>
      <Form.Item name="balance_index" label="Chỉ số cân đối">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Chỉ số cân đối"
        />
      </Form.Item>
      <Form.Item name="water_percentage" label="Nước (%)">
        <InputNumber
          disabled={isDisabled}
          inputMode="numeric"
          min={1}
          placeholder="Nước"
        />
      </Form.Item>

      {isDetail && (
        <UploadCustom
          nameField="images"
          isDetail
          listDetail={listImages}
          uploadChange={handleImageChange}
          valueChange={formChange}
          handleValueChange={handleUploadChange}
          isDisabled={isDisabled}
        />
      )}

      {isDetail && Object.keys(formChange).length > 0 && !isDisabled && (
        <Space
          className="space-list"
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 30,
            marginTop: 25,
            padding: "0 10px",
            flexWrap: "wrap",
          }}
        >
          <Button
            style={{ minWidth: 130 }}
            className="btn-second"
            onClick={() => {
              form.setFieldsValue({ ...formDefault.current });
              setListImages(
                formDefault.current?.images?.length !== 0
                  ? formDefault.current?.images
                  : []
              );
              setFormChange({});
            }}
          >
            Hủy
          </Button>
          <Button
            loading={update.isLoading}
            style={{ minWidth: 130 }}
            htmlType="submit"
            className="btn-submit"
          >
            {update.isLoading ? null : "Cập nhật"}
          </Button>
        </Space>
      )}

      {!isDetail && (
        <UploadCustom
          nameField="images"
          uploadChange={handleImageChange}
          isDisabled={isDisabled}
        />
      )}
      {!isDetail && !isDisabled && (
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
      )}
    </Form>
  );
}

export default FormHeal;
