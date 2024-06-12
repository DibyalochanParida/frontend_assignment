import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { postUsers } from "../store/reducers/usersReducer/postUsers";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postSuccess, postFetching, postError } = useSelector((state) => state.postUsersSlice);

  //formik start
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      companyName:"",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter name"),
      email: yup.string().required("Enter email"),
      phone: yup.string().required("Enter phone no"),
      companyName:yup.string().required("Enter Company Name"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(postUsers(values))
      resetForm(values)
    },
  });
  //formik end

  useEffect(() => {
    if (postSuccess) {
      navigate("/");
    }
    if (postError) {
      toast.error('Server Error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [postSuccess,postError,navigate])
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <form onSubmit={formik.handleSubmit} >
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Typography  variant="h5">
              Add detils Form
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic"
                placeholder="Enter phone name"
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic"
                placeholder="Enter phone email"
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic"
                placeholder="Enter phone number"
                fullWidth label="Phone"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic"
                placeholder="Enter Company Name"
                fullWidth
                label="companyName"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
                variant="outlined" />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
              {postFetching !== true ?
                <Button variant="contained" size="large" type="submit" color="success">
                  Submit
                </Button> :
                <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
                  Submit
                </LoadingButton>
              }
            </Grid>
          </Grid>
        </form>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Form
