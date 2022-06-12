import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";
import debounce from "lodash.debounce";
import { Col, Form, Row, Select } from "antd";

FilterRanks.propTypes = {
  onFilterChange: PropTypes.func,
  isRound: PropTypes.bool,
  filterDefault: PropTypes.object,
};

FilterRanks.defaultProps = {
  onFilterChange: null,
  isRound: false,
  filterDefault: {},
};

function FilterRanks({ onFilterChange, isRound, filterDefault }) {
  const [form] = Form.useForm();

  const debounceFilter = useRef(
    debounce((nextValue) => onFilterChange(nextValue), 0)
  ).current;

  const handleValuesChange = (changedValues, allValues) => {
    if (onFilterChange) {
      debounceFilter(allValues);
    }
  };

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      initialValues={filterDefault}
      className="filter-ranks"
    >
      <Row gutter={10}>
        {isRound ? (
          <Col span={14}>
            <Form.Item name="round_id">
              <Select placeholder="Vòng" allowClear>
                <Select.Option value={1}>Vòng 1</Select.Option>
                <Select.Option value={2}>Vòng 2</Select.Option>
                <Select.Option value={3}>Vòng 3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        ) : (
          <Col span={14}>
            <Form.Item name="race_id">
              <Select placeholder="Chặng" allowClear>
                <Select.Option value={1}>Chặng 1</Select.Option>
                <Select.Option value={2}>Chặng 2</Select.Option>
                <Select.Option value={3}>Chặng 3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )}
        <Col span={10}>
          <Form.Item name="area_id">
            <Select placeholder="Khu vực" allowClear>
              <Select.Option value={1}>Khu vực 1</Select.Option>
              <Select.Option value={2}>Khu vực 2</Select.Option>
              <Select.Option value={3}>Khu vực 3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterRanks;
