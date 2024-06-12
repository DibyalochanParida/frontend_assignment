import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const putUsers = createAsyncThunk(
  "/",
  async ({values,id},thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/usersput/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({
           name:values.name,
           email:values.email,
           phone:values.phone,
           companyName:values.companyName,
        }),
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


export const putUsersSlice = createSlice({
  name: "usersput",
  initialState: {
    putFetching: false,
    putSuccess: false,
    putError: false,
    errorMessage: "",
  },
  reducers: {
    putUsersclearState: (state) => {
      state.putError = false;
      state.putSuccess = false;
      state.putFetching = false;
      return state;
    },
  },
  extraReducers: {
    [putUsers.fulfilled]: (state, { payload }) => {
      state.putFetching = false;
      state.putSuccess = true;
      state.putError = false;
    },
    [putUsers.pending]: (state) => {
      state.putFetching = true;
    },
    [putUsers.rejected]: (state, { payload }) => {
      state.putFetching = false;
      state.putError = true;
      state.putSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { putUsersclearState } = putUsersSlice.actions;