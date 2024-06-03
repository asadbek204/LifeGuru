import React, { FormEvent, useContext, useState } from 'react'
import styles from './Login.module.css'
import GlobalContext from '@contexts';
import Button from '@components/loginButton/Button';
import Input from '@components/loginInput/Input';

const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

enum AuthTypes {
    signIn = "true",
    signUp = "false"
}

export default function Login() {
    const { user, setAuth } = useContext(GlobalContext)
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ confirmPassword, setConfirmPassword ] = useState<string>('')
    const [ signIn, setSignIn ] = useState<boolean>(true)

    function emailOnChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement
        setEmail(element.value)
        if (!element.validity.valid) return element.classList.add(styles.form__input_error)
        if (!(element?.value && element.value.match(isValidEmail))) return element.classList.add(styles.form__input_error)
        element.classList.remove(styles.form__input_error)
        element.classList.add(styles.form__input_correct)
    }

    function passwordOnChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement
        setPassword(element.value)
        if (element.value.length < 8) return element.classList.add(styles.form__input_error)
        element.classList.remove(styles.form__input_error)
        element.classList.add(styles.form__input_correct)
    }

    function confirmPasswordOnChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement
        setConfirmPassword(element.value)
        if (element.value.length < 8) return element.classList.add(styles.form__input_error)
        if (element.value !== password) return element.classList.add(styles.form__input_error)
        element.classList.remove(styles.form__input_error)
        element.classList.add(styles.form__input_correct)
    }

    function onSubmit(): void {
        if (user !== undefined && setAuth !== undefined) {
            user.email = email
            setAuth(true)
        }
    }

    function switcher(event: FormEvent<HTMLButtonElement>): void {
        const element = event.target as HTMLButtonElement
        setSignIn(element.dataset.form === AuthTypes.signIn)
    }

    const getClass = (value: boolean) => (signIn === value)? styles.form_open : styles.form_close

    return (
    <div className={ styles.container }>
        <form className={ `${ styles.form } ${ getClass(true) }` }>
            <Input className={ styles.form__input } name='email' type='email' value={ email } onChange={ emailOnChange } />
            <Input className={ styles.form__input } name='password' type='password' value={ password } onChange={ passwordOnChange } />
            <Button className={ styles.form__submit } type='submit' onClick={ onSubmit }>Sign In</Button>
            <button className={ styles.form__switch } type='button' data-form={ AuthTypes.signUp } onClick={ switcher }>sign up</button>
        </form>
        <form className={ `${ styles.form } ${ getClass(false) }` }>
            <Input className={ styles.form__input } name='email' type='email' value={ email } onChange={ emailOnChange } />
            <Input className={ styles.form__input } name='password' type="password" value={ password } onChange={ passwordOnChange } />
            <Input className={ styles.form__input } name='confirm-password' type="password" value={ confirmPassword } onChange={ confirmPasswordOnChange }/>
            <Button className={ styles.form__submit } type="submit" onClick={ onSubmit }>Sign Up</Button>
            <button className={ styles.form__switch } type='button' data-form={ AuthTypes.signIn } onClick={ switcher }>sign up</button>
        </form>
    </div>
    )
}