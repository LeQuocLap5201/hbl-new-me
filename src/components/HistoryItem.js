/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import FormHeal from "../components/FormHeal";

HistoryItem.propTypes = {
  id: PropTypes.number,
};

HistoryItem.defaultProps = {
  id: null,
};

function HistoryItem({ id }) {
  const [form] = Form.useForm();

  return <FormHeal idDetail={id} isDetail form={form} />;
}

export default HistoryItem;
