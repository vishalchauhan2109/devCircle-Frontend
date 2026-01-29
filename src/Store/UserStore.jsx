import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice'

const UserStore = configureStore({
    reducer:UserReducer
})

export default UserStore;