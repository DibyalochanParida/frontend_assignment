import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "/users",
  async (thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/users`,
        {
          method: "GET",
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


export const getUsersSlice = createSlice({
  name: "users",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    usersdata: "",
  },
  reducers: {
    getUsersclearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.usersdata = payload.data;
    },
    [getUsers.pending]: (state) => {
      state.isFetching = true;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { getUsersclearState } = getUsersSlice.actions;