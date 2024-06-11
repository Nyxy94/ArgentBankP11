import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
    },
});

export default store;




