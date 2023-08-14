import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: (confirmation: boolean) => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const [open, setOpen] = useState(props.open);

  useEffect(()=>{
    props.open === true ? setOpen(true): setOpen(false);
  },[props.open])

  const handleClose = () => {
    setOpen(false);
    props.onConfirm(false);
  };

  const handleConfirmation = () =>{
    setOpen(false);
    props.onConfirm(true);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="modal-confirmation">
        {"Are you sure you want to delete?"}
      </DialogTitle>      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirmation} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
