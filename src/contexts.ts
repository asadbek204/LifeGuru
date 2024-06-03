import { createContext } from "react"
import { TGlobalContext, THomeContext } from "./types"

const GlobalContext = createContext<TGlobalContext>({ })

export const HomeContext = createContext<THomeContext>({ })

export default GlobalContext