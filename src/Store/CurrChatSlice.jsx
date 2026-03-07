import { createSlice } from "@reduxjs/toolkit";


const CurrChatSlice = createSlice({
    name : 'currchat',
    initialState:{
        user :null
    },

    reducers :{
        CurrChat : (state , action)=>{
            state.currchat = action.payload;
        },
    }
})


export const {CurrChat} = CurrChatSlice.actions;
export default CurrChatSlice.reducer;