import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartIcon, MapMakerIcon } from '~/components/Icons'

import Account from './Account'
import CartItem from './CartItem'
import Navigation from './Navigation'
import Search from './Search/Search'

import routes from '~/config/routes'
import classnames from 'classnames/bind'
import images from '~/assets/images'
import styles from './Header.module.scss'
import AccountLogin from './AccountLogin/AccountLogin'
import * as cartServices from '~/apiServices/cartServices'
import FormatCurrency from '~/commonServices/FormatCurrency'

const cx = classnames.bind(styles)

function Header() {
    const [carts, setCarts] = useState([])
    const headerRef = useRef()
    const isLogin = true

    useEffect(() => {
        const fechAPI = async () => {
            const result = await cartServices.getCarts()
            setCarts(result)
        }
        fechAPI()
    }, [])

    const slideHeader = () => {
        const scrolled = document.documentElement.scrollTop || window.scrollY
        headerRef.current.style.transition = 'all 1s'
        if (scrolled >= 600) {
            headerRef.current.style.height = 50 + 'px'
        } else {
            headerRef.current.style.height = 80 + 'px'
        }
    }

    window.addEventListener('scroll', slideHeader)

    const productTotal = carts.reduce((total, current) => total + current.quantity, 0)
    const moneyTotal = FormatCurrency(carts.reduce((total, current) => total + current.quantity * current.price, 0))

    return (
        <header className={cx('header')}>
            <div className={cx('wrapper')} ref={headerRef}>
                <div className={cx('content')}>
                    <div className={cx('logo')}>
                        <Link to={routes.home}>
                            <img src={images.logo} alt='logo' className={cx('logo-img')} />
                        </Link>
                    </div>
                    <Search />
                    <div className={cx('actions')}>
                        {!isLogin ? <AccountLogin /> : <Account />}

                        <div className={cx('cart')}>
                            <Link to={routes.cart} className={cx('btn-cart')}>
                                <CartIcon className={cx('actions-icon')} />
                                <span className={cx('actions-text')}>Gi??? h??ng ({carts.length})</span>
                            </Link>
                            <div className={cx('cart-list')}>
                                <h5 className={cx('cart-list-heading')}>S???n ph???m ???? th??m</h5>
                                <div className={cx('list-item', 'scrollbar-custom')}>
                                    {carts.map((product) => (
                                        <CartItem key={product.code} item={product} link='/cart' />
                                    ))}
                                </div>
                                <div className={cx('cart-total')}>
                                    <span className={cx('total-quantity')}>
                                        C?? t???ng s??? <b>{productTotal}</b> s???n ph???m
                                    </span>
                                    <span>T???ng ti???n:</span>
                                    <span className={cx('total-money')}>{moneyTotal}</span>
                                </div>
                                <div className={cx('cart-footer')}>
                                    <Link to={routes.cart}>
                                        <button className={cx('cart-btn')}>Xem chi ti???t</button>
                                    </Link>
                                    <Link to={routes.checkout}>
                                        <button className={cx('cart-btn', 'active')}>
                                            <span>Thanh to??n ngay</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('locations')}>
                            <MapMakerIcon className={cx('actions-icon')} />
                            <span className={cx('actions-text')}>????k L??k</span>
                        </div>
                    </div>
                </div>
            </div>
            <Navigation />
        </header>
    )
}

export default Header
