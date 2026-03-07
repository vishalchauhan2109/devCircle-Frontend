import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import SidebarReducer from "./SidebarSlice";
import CurrChatReducer from "./CurrChatSlice";

export const Store = configureStore({
  reducer: {
    UserStore: UserReducer,
    SidebarStore: SidebarReducer,
    CurrChatStore: CurrChatReducer,
  },
});