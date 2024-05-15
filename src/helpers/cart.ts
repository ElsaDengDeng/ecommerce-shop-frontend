// 将商品添购物车

import exp from "constants";
import { Product } from "../app/models/Product";

export interface CartItem extends Product {
    count: number
}
export const addItem = (item: Product, next: () => void) => {
    let cart: CartItem[] = []
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart")!)
        }
        // 去重
        
        cart.push({
            ...item,
            count: 1
        })
    }
    // 不重复id的数组
    cart = Array.from(new Set(cart.map(item => item._id))).map(item => {
        return cart.find(product => product._id === item)
    }) as CartItem[]

    localStorage.setItem("cart", JSON.stringify(cart))
    next()
}

// 获取本地购物车数据

export const getCart = () => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart") as string) as CartItem[]
        }
    }
    return []
}

// 更改购物车中商品的数量
export const updateItem = (productId: string, count: number) => {
    let cart: CartItem[] = []
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart")!)
        }
        cart.forEach((item, index) => {
            if(item._id === productId) {
                cart[index].count = count
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}



// 删除购物中的商品
export const deleteItem = (productId: string) => {
    let cart: CartItem[] = []
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart")!)
        }
        cart.forEach((item, index) => {
            if(item._id === productId) {
                cart.splice(index, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}