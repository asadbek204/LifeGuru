import viewport from '@assets/viewport.png'
import { HomeContext } from '@contexts'
import { THomeContext } from '@types'
import { useContext } from 'react'

let style: {color: string, fill: string, rotate: string} = { color: "white", fill: 'white', rotate: '0deg' }

export default function Viewport() {
  const {setFull} = useContext(HomeContext) as Required<THomeContext>

  function change() {
    setFull(prev => {
      if (!prev) style = {...style, rotate: '180deg'}
      else style = {...style, rotate: '0deg'}
      return !prev
    })
  }
  
  return (
    <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' } }>
      <button type='button' onClick={ change } style={ { width: '45px', height: '45px', backgroundColor: 'blue', borderRadius: '50%' } }><svg  focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronLeftIcon" style={ style }><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></button>
      <img src={ viewport } alt="viewport" />
    </div>
  )
}
