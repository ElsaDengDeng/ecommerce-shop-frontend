import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../app/models/Product"

export interface GetProductPayload {
  sortBy: 'createAt' | 'sold';
  order?: string;
  limit?: number;
}
export interface GetProductSuccessPayload {
  payload: Product[],
  sortBy: 'createAt' | 'sold'
}
export interface FilterPayload {
  order?: string
  sortBy?: 'createAt' | 'sold'
  limit?:number
  skip: number
  filters?: {
    category: string[]
    price: number[]
  }
}
export interface ProductState{
  createAt: {
    loaded: boolean
    success: boolean
    products: Product[]
  }
  sold: {
    loaded: boolean
    success: boolean
    products: Product[]
  }
  search: Product[]
  filter: {
    loaded: boolean
    success: boolean
    result: {
      size: number
      data: Product[]
    }
  }
  product: {
    loaded: boolean
    success: boolean
    result: Product
  }
}

export const initialState: ProductState =  {
  createAt: {
    loaded: false,
    success: false,
    products: []
  },
  sold: {
    loaded: false,
    success: false,
    products: []
  },
  search: [],
  filter: {
    loaded: false,
    success: false,
    result: {
      size: 0,
      data: []
    }
  },
  product: {
    loaded: false,
    success: false,
    result: {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: {
        _id: "",
        name: ""
      },
      quantity: 0,
      sold: 0,
      photo: new FormData(),
      shipping: false,
      createdAt: ""
    }
  }
}


//`createSlice` 这个函数自动为每个 reducer 函数创建对应的 action creator 和 action type。
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // `PayloadAction` 一个 TypeScript 泛型，用于指定 action 的 payload 类型
    getProduct: (state, action: PayloadAction<GetProductPayload>) => {
      const { sortBy } = action.payload
      state[sortBy] = {
        ...state[sortBy === "createAt" ? "createAt" : "sold"],
        loaded: false,
        success: false
      }
    },
    getProductSuccess: (state, action: PayloadAction<GetProductSuccessPayload>) => {
      const { sortBy, payload } = action.payload
      state[sortBy] = {
        loaded: true,
        success: true,
        products: payload
      }
    },
    searchProductSuccess: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        search: action.payload
      }
    },
    filterProduct: (state, action: PayloadAction<FilterPayload>) => {
      state.filter.loaded = false
      state.filter.success = false
      state.filter.result = {
        size: 0,
        data: state.filter.result.data
      }
    },
    filterProductSuccess: (state, action: PayloadAction<{skip: number, payload: { size: number, data: Product[]}}>) => {
      const { skip, payload } = action.payload
      state.filter = {
        loaded: true,
        success: true,
        result: {
          size: payload.size,
          data: skip === 0 ? payload.data : [...state.filter.result.data, ...payload.data]
        }
      }
    },
    getProductById: (state) => {
      state.product = {
        ...state.product,
        loaded: false,
        success: false
      };
    },
    getProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.product = {
        loaded: true,
        success: true,
        result: action.payload
      };
    }
  },
  selectors: {
    selectProduct: state => state
  }
})

export const { selectProduct } = productSlice.selectors
export const {
  getProduct,
  getProductSuccess,
  searchProductSuccess,
  filterProduct,
  filterProductSuccess,
  getProductById,
  getProductByIdSuccess
} = productSlice.actions;

export default productSlice.reducer;