import React from 'react';
import { Button } from 'react-bootstrap';

import styles from './CreateButton.module.scss';

interface IProps {
  handleShow: () => void;
  name: string;
}

const CreateButton = ({ handleShow, name }: IProps) => {
  return (
    <div>
      <Button onClick={handleShow} className={styles.wrapper}>
        Create {name}
      </Button>
    </div>
  );
};

export default CreateButton;
