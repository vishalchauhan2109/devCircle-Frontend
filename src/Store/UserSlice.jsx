import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name :'user',
    initialState:{
        user :null
    },
    reducers :{
        LoggedInUser : (state , action)=>{
            state.user = action.payload;
        },

         LoggedOutUser: (state) =>{
            state.items.length = 0;
        },
    }
})

export const {LoggedInUser, LoggedOutUser} = UserSlice.actions;
export default UserSlice.reducer;