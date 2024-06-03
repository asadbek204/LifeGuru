import { CSSProperties } from "react"
import { TInput } from "@types"


const style: CSSProperties = {
    color: '#0a0a0a',
    backgroundColor: 'transparent',
    padding: '10px 20px',
    borderBottom: '1px solid #0a0a0a'
}

export default function Input(props: TInput) {
  return (
    <input style={style} {...props}/>
  )
}
