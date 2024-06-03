import { HomeContext } from "@contexts"
import { Pages, TButton, THomeContext } from "@types"
import { useContext } from "react"


type TNavButton = TButton & { page?: Pages, onActive?: string }

export default function Button({ page, className, onActive, ...props }: TNavButton) {
    const context = useContext(HomeContext) as Required<THomeContext>
    if (page && onActive) if (page === context.page) className += ` ${ onActive }`
    return <button 
                className={ className } 
                type='button' 
                { ...props }
                onClick={ (!props.onClick && page) ? () => context.setPage(page) : props.onClick }
            />
}