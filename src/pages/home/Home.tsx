import { useState, ReactElement, useContext } from 'react'
import styles from './Home.module.css'
import { Pages } from '@types'
import Chat from '@pages/Chat/Chat'
import Recs from '@pages/Recommendations/Recs'
import Details from '@pages/Details/Details'
import Profile from '@pages/Profile/Profile'
import ViewPort from '@pages/ViewPort/Viewport'
import GlobalContext, {HomeContext} from '@contexts'
import Button from '@components/navButton/Button'

const pagesMap = new Map<Pages, ReactElement>()
pagesMap.set( Pages.RECOMMENDATIONS, <Recs /> )
pagesMap.set( Pages.DETAILS, <Details /> )

export default function Home() {
    const [ page, setPage ] = useState<Pages>(Pages.RECOMMENDATIONS)
    const [ full, setFull ] = useState<boolean>(false)
    const { user, setAuth } = useContext(GlobalContext)
    function logout() {
        if (setAuth !== undefined && user !== undefined) {
            user.email = ''
            user.isAuthorized = false
            setAuth(false)
        }
    }
    const onActive = styles['header__item_active']
    return (
    <HomeContext.Provider value={ { page: page, setPage: setPage, full: full, setFull: setFull } }>
    <div className={ styles.home }>
        <header className={ styles.header }>
            <Button className={ styles.header__logo } page={ Pages.RECOMMENDATIONS }>LIFEGURU</Button>
            <div className={ styles.header__account }>
                <Button className={ styles.header__profile } page={ Pages.PROFILE }>{ user?.email }</Button>
                <Button className={ styles.header__logout } onClick={ logout }>Logout</Button>
            </div>
        </header>
        {(page === Pages.PROFILE)?
            <Profile />:
            <div className={ styles.home__content }>
                <aside className={ `${styles.home__aside} ${ (full)? styles.home__aside_closed : '' }` } >
                    <nav className={ styles.header__nav }>
                        <Button className={ styles.header__item } page={ Pages.RECOMMENDATIONS } onActive={ onActive }>
                            <svg className={ styles.header__icon} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z"></path>
                            </svg>
                            RECOMMENDATIONS
                        </Button>
                        <Button className={ styles.header__item } page={ Pages.DETAILS } onActive={ onActive }>
                            <svg className={ styles.header__icon } focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"></path>
                            </svg>
                            DETAILS
                        </Button>
                    </nav>
                    { pagesMap.get(page) }
                </aside>
                <main className={ `${styles.home__main} ${ (full)? styles.home__main_full : '' }` }>
                    <ViewPort />
                    <Chat />
                </main>
            </div>
        }
    </div>
    </HomeContext.Provider>
    )
}