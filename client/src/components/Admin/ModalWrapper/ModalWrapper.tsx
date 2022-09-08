import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IProps {
  show: boolean;
  handleShow: () => void;
  name: string;
  children: React.ReactNode;
}

const ModalWrapper = ({ show, handleShow, children, name }: IProps) => {
  return (
    <div>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal>
    </div>
  );
};

export default ModalWrapper;
