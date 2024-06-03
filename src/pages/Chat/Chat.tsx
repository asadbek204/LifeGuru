import { FormEvent, RefObject, useRef, useState } from 'react'
import styles from './Chat.module.css'

class Message {
    isBot: boolean
    text: string
    at: string

    constructor(isBot: boolean, text: string, at: string) {
        this.isBot = isBot
        this.text = text
        this.at = at
    }
}

function fetchFake() {
    const now = new Date()
    return new Promise(resolve => setTimeout(() => resolve(new Message(true, "Hello world", `${now.getHours()}:${now.getMinutes()}`)), 1000))
}

export default function Chat() {
    const [ open, setOpen ] = useState<boolean>(false)
    const [ writing, setWritingStatus ] = useState<boolean>(false)
    const [ messages, setMessage ] = useState<Message[]>([])
    const [ userMessage, setUserMessage ] = useState<string>('')
    const [ file, setFile ] = useState<File | undefined>(undefined)
    const fileInput = useRef<HTMLInputElement>()

    function getAnswer() {
        setWritingStatus(true)
        fetchFake()
        .then(message => {
                setMessage(prev => [...prev, (message as Message)])
                console.log(message)
                setWritingStatus(false)
            }
        )
    }

    function fileOnChange(event: FormEvent<HTMLInputElement>) {
        const element = (event.target as HTMLInputElement)
        if (element.files !== null) setFile(element.files[0])
        
    }

    function messageOnChange(event: FormEvent<HTMLInputElement>) {
        const element = event.target as HTMLInputElement
        setUserMessage(element.value)
    }

    function sendFile() {
        if (!file) return
    }

    function sendMessage() {
        const now = new Date()
        setMessage(prev => [...prev, new Message(false, userMessage, `${now.getHours()}:${now.getMinutes()}`)])
        getAnswer()
        setUserMessage('')
    }

    return (
    <>
        {(open)?
        <div className={ styles.chat }>
            <div className={ styles.chat__header }>
                <button className={ styles.chat__arrow } type="button" onClick={ () => setOpen(false) }>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={ { color: 'white', fill: 'white', rotate: '-90deg' } }><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </button>
                <span className={ styles.chat__title }>Chat</span>
                <div className={ styles.chat__status }>
                    {(writing) ? 
                    <>
                        typing
                        <div className={ styles['chat__status-dots'] }><div></div><div></div><div></div></div>
                    </>:
                    <>
                        online
                    </>}
                </div>
            </div>
            <div className={ styles.chat__viewport }>
            {messages.map(value => {
                let className: string = styles.chat__message
                if (!value.isBot) className += ' ' + styles.chat__message_my
                return (
                <div className={ className }>
                    <div className={ `${styles['chat__message-container']}  ${(!value.isBot)?styles['chat__message-container_my']: ''}` }>
                        <div className={ styles['chat__message-content'] }>{ value.text }</div>
                        <div className={ styles['chat__message-footer'] }>
                            <span className={ styles['chat__message-date'] }>{ value.at }</span>
                        </div>
                    </div>
                </div>
            )})}
            </div>
            <div className={ styles.chat__footer }>
                <div className={ styles['chat__send-file']}>
                    <button className={ styles['chat__open-file']} type="button" onClick={ () => { if (fileInput !== undefined) fileInput.current?.click() } }>
                        <svg aria-hidden="true" style={ { width: '100%', height: '100%', fill: 'white', color: 'white' } } focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"></path>
                        </svg>
                    </button>
                    <input type="file" name="media" ref={ fileInput as RefObject<HTMLInputElement> } style={ { display: "none" } } onChange={ fileOnChange } />
                </div>
                <input className={ styles['chat__message-input'] } type="text" value={ userMessage } onChange={ messageOnChange }/>
                <button className={ styles['chat__message-send'] } type="button" onClick={ sendMessage }>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" style={ { color: 'white' } }  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                    </svg>
                </button>
            </div>
            {(file)?
            <div className={ styles.model }>
                <button className={ styles.model__send } type="button" onClick={ sendFile }>
                    <img src={ URL.createObjectURL(file) } alt="opened file" />
                </button>
            </div>:
            <></>}
        </div>
        :
        <button className={ styles.chat_closed } onClick={ () => setOpen(true) }>
            <span className={ styles.chat_closed__name }>chat</span>
        </button>
        }
    </>
    )
}