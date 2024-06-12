import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postUsers = createAsyncThunk(
  "/userspost",
  async ({name,email,phone,companyName},thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/userspost`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({
           name,
           email,
           phone,
           companyName,
        }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        alert("Server Error")
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      alert(e)
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const postUsersSlice = createSlice({
  name: "userspost",
  initialState: {
    postFetching: false,
    postSuccess: false,
    postError: false,
    errorMessage: "",
  },
  reducers: {
    postUsersclearState: (state) => {
      state.postError = false;
      state.postSuccess = false;
      state.postFetching = false;
      return state;
    },
  },
  extraReducers: {
    [postUsers.fulfilled]: (state, { payload }) => {
      state.postFetching = false;
      state.postSuccess = true;
      state.postError = false;
    },
    [postUsers.pending]: (state) => {
      state.postFetching = true;
    },
    [postUsers.rejected]: (state, { payload }) => {
      state.postFetching = false;
      state.postError = true;
      state.postSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { postUsersclearState } = postUsersSlice.actions;