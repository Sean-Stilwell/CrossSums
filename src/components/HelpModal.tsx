import * as React from 'react';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

interface HelpModalProps {
    title: string;
    content: string;
    close: string;
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

export default function HelpModal(props: HelpModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button variant="contained" startIcon={<HelpIcon />} onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Modal open={open} onClose={handleClose} >
        <Paper sx={style}>
          <Typography variant="h6" component="h2" id="modal-modal-title">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description">
            {props.content}
          </Typography >
        </Paper>
      </Modal>
    </span>
  );
}