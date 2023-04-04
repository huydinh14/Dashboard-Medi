import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            if(action.payload === null)
            {
                localStorage.removeItem("userDT");
            }
            else
            {
                if(action.payload.token)
                {
                    localStorage.setItem("userDT", action.payload.token);
                }
            }
            state.user = action.payload;
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;