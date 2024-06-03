import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction } from "react"

export enum Pages {
    RECOMMENDATIONS = 1,
    DETAILS,
    PROFILE,
}

// TLoginInput : type for props of custom buttons
export type TInput = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'style'>

// TLoginButton : type for props of custom inputs
export type TButton = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'style'>

// TUser : type for defining user
export type TUser = {
    email: string
    name: string
    isAuthorized: boolean
}

// TGlobalContext : type for GlobalContext of application
export type TGlobalContext = {
    setAuth?: Dispatch<SetStateAction<boolean>>
    user?: TUser
}

// THomeContext : type for Home component context
export type THomeContext = {
    setPage?: Dispatch<SetStateAction<Pages>>
    page?: Pages
    full?: boolean
    setFull?: Dispatch<SetStateAction<boolean>>
}

export default TUser