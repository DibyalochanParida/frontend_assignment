import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUsers = createAsyncThunk(
  "/usersdelete/",
  async ({id},thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/usersdelete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }, 
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const deleteUsersSlice = createSlice({
  name: "usersdelete",
  initialState: {
    deleteFetching: false,
    deleteSuccess: false,
    deleteError: false,
    errorMessage: "",
  },
  reducers: {
    deleteUsersclearState: (state) => {
      state.deleteError = false;
      state.deleteSuccess = false;
      state.deleteFetching = false;
      return state;
    },
  },
  extraReducers: {
    [deleteUsers.fulfilled]: (state, { payload }) => {
      state.deleteFetching = false;
      state.deleteSuccess = true;
      state.deleteError = false;
    },
    [deleteUsers.pending]: (state) => {
      state.deleteFetching = true;
    },
    [deleteUsers.rejected]: (state, { payload }) => {
      state.deleteFetching = false;
      state.deleteError = true;
      state.deleteSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { deleteUsersclearState } = deleteUsersSlice.actions;