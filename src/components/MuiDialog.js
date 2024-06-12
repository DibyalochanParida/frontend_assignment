import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { deleteUsers } from "../store/reducers/usersReducer/deleteUsers";
import { useSelector, useDispatch } from 'react-redux';


export default function MuiDialog({ deleteItem, openDelete, setOpenDelete }) {
  const {deleteSuccess} = useSelector((state) => state.deleteUsersSlice);
  const dispatch = useDispatch()

  // useEffect for server response
  React.useEffect(() => {
    if (deleteSuccess) {
      setOpenDelete(false)
    }
  }, [deleteSuccess,setOpenDelete])

  // onClick for close delete dialog
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  // onClick for delete item
  const handleDelete = () => {
    dispatch(deleteUsers({ id: deleteItem }));
  }

  return (
    <>
      {/* dialog for Delete */}
      <Dialog disableEscapeKeyDown  open={openDelete} onClose={handleCloseDelete}>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
