import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';

const CustomCheck = ({ onCheck, value }: any) => {
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
