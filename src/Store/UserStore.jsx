import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice';
import SidebarReducer from './SidebarSlice'; // fix typo

// First store
export const UserStore = configureStore({
  reducer: UserReducer,
});

// Second store
export const SidebarStore = configureStore({
  reducer: SidebarReducer,
});
