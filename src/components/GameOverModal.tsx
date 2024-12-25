import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

interface GameOverProps {
    display: boolean;
    message: string;
    setFunc: (value: boolean) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GameOverModal(props: GameOverProps) {
  const handleClose = () => {
    props.setFunc(false);
  };

  return (
    <Modal open={props.display} onClose={handleClose} >
        <Paper sx={style}>
            <Typography variant="h6" component="h2" id="modal-modal-title">
            {props.message}
            </Typography>
        </Paper>
    </Modal>
  );
}