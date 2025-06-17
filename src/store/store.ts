import { configureStore } from "@reduxjs/toolkit";
import datasHarbourSlice from './datasHarbourSlice/datasHarbourSlice'

const store = configureStore({
    reducer:{
        datasHarbour: datasHarbourSlice
    }
})


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store