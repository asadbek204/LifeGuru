import { CSSProperties } from 'react'
import { TButton } from '@types'

const style: CSSProperties = {
    color: 'white',
    backgroundColor: '#5bafdd',
    fontSize: '20px',
    padding: '10px 20px',
    textAlign: 'center'
}

export default function Button(props: TButton) {
  return (
    <button style={style} {...props} />
  )
}
