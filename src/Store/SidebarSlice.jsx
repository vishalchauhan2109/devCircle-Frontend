import { createSlice } from "@reduxjs/toolkit";
// import { SidebarOpen } from "lucide-react";
// import { Sidebar } from "lucide-react";


const SidebarSlice = createSlice({
    name:'sidebar',
    initialState: {
        sidebar:false
    },
    reducers :{
        sidebarOpen: (state)=>{
            state.sidebar = true       },
        sidebarClose: (state)=>{
            state.sidebar = false
        }
    }
})

export const {sidebarClose,sidebarOpen} = SidebarSlice.actions;
export default SidebarSlice.reducer;