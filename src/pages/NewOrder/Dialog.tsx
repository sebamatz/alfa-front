import * as React from "react";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

import Typography from "@material-ui/core/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function OrderDialog(props) {
  const { onClose, getPdf, open, finDoc } = props;
  // const [isOpen, setOpen] = React.useState(false);

  const handleClose = () => {
    window.location.reload();

    onClose(false);
  };

  const completeOrder = () => {
    window.location.reload();
  };

  return (
    <div>
      <BootstrapDialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          style={{ padding: "16px 14px" }}
        >
          Επιτυχής αποστολή
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>ΠΑΡΑΓΓΕΛΙΑ {finDoc}</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={completeOrder}
          >
            συνεχεια
          </Button>
          <Button onClick={getPdf}>
            <PictureAsPdfIcon style={{ color: "red", fontSize: "40px" }} />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
