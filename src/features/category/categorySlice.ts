import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Category } from "../../app/models/Category"

export interface CategoryState {
  category: {
    loaded: boolean
    success: boolean
    result: Category[]
  }
}

export const initialState: CategoryState =  {
  category: {
    loaded: false,
    success: false,
    result: []
  }
}


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategory: (state) => {
      state.category.loaded = false
      state.category.success = false
      state.category.result = []
    },
    getCategorySuccess: (state, action: PayloadAction<Category[]>) => {
      state.category.loaded = true
      state.category.success = true
      state.category.result = action.payload
    },
  },
  selectors: {
    selectCategory: state => state.category
  }
})

export const { selectCategory } = categorySlice.selectors
export const { getCategory, getCategorySuccess} =
categorySlice.actions;

export default categorySlice.reducer;