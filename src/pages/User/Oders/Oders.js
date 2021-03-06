import classNames from 'classnames/bind'
import User from '../User'
import styles from './Orders.module.scss'
const cx = classNames.bind(styles)

function Oders() {
    return (
        <User>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>Quản lý đơn hàng</div>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('header-collumn')}>Đơn hàng</div>
                        <div className={cx('header-collumn')}>Ngày mua</div>
                        <div className={cx('header-collumn')}>Tổng tiền</div>
                        <div className={cx('header-collumn')}>Tình trạng</div>
                        <div className={cx('header-collumn')}>Nhận xét</div>
                    </div>
                    <div className={cx('body')}>
                        <img
                            src='https://winmart.vn/_next/static/images/no-product-c2f7be08e62593a82bc819708625486b.png'
                            alt='no-orders-img'
                        ></img>
                        <span className={cx('not-fount-text')}>Không tìm thấy kết quả</span>
                    </div>
                </div>
            </div>
        </User>
    )
}

export default Oders
