import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface DrawerState {
  drawers: {
    [key: string]: boolean;
  };
}

const initialState: DrawerState = {
  drawers: {
    drawerFilter: false,
    drawerSidebar:false,
    drawerMenu: false,
  
  },
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<string>) => {
      const drawerName = action.payload;
      state.drawers[drawerName] = true; 
    },
    closeDrawer: (state, action: PayloadAction<string>) => {
      const drawerName = action.payload;
      state.drawers[drawerName] = false; 
    },

    toggleDrawer: (state, action: PayloadAction<string>) => {
      const drawerName = action.payload;
      state.drawers[drawerName] = !state.drawers[drawerName]; 
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
