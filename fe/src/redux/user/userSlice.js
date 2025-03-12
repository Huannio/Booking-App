import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/utils/axios.config";

const initialState = {
  currentUser: null,
};

export const loginUserApi = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
});

export const logoutUserApi = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
});

export const getUserInfoApi = createAsyncThunk("auth/getUserInfo", async () => {
  const response = await axios.get("/auth/me");
  return response.user;
});

// Khởi tạo slice trong store
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // Xử lý dữ liệu đồng bộ
  // Xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      // action.payload là response.data được trả về ở trên
      const user = action.payload;
      state.currentUser = user; // Update lại state
    });
    builder.addCase(logoutUserApi.fulfilled, (state) => {
      state.currentUser = null;
    });
    builder.addCase(getUserInfoApi.fulfilled, (state, action) => {
      state.currentUser.permissions = action.payload.permissions;
    });
  },
});

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const selectCurrentPermission = (state) => {
  return state.user.currentUser.permissions;
};

export const userReducer = userSlice.reducer;
