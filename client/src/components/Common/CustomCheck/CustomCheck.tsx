import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  onCheck: any;
  value: any;
}

const CustomCheck = ({ onCheck, value }: IProps) => {
  const target = useRef(null);

  const handleClick = (e: any) => {
    onCheck(e, target);
  };

  return (
    <Form.Check
      value={value}
      ref={target}
      onClick={handleClick}
      data-tip="Filter"
      data-event="click"
      type="checkbox"
    />
  );
};

export default CustomCheck;
