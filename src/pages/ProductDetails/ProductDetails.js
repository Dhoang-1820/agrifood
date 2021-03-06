/* eslint-disable jsx-a11y/alt-text */
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartIcon, MinusIcon, PlusIcon } from '~/components/Icons'
import Carousel from 'react-multi-carousel'
import CustomDots from './CustomDots/CustomDots'

import * as productServices from '~/apiServices/productServices'

import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './ProductDetails.module.scss'
const cx = classNames.bind(styles)

function ProductDetails() {
    const [details, setDetails] = useState([])
    const [inputValue, setInputValue] = useState(1)
    const [tab, setTab] = useState('')

    const param = useParams()

    useEffect(() => {
        const fechAPI = async () => {
            const result = await productServices.getProductDetails(param.id)
            const product = result[0]
            setTab(product.types[0])
            setDetails(...result)
        }
        fechAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMinus = () => {
        inputValue >= 2 && setInputValue((prev) => prev - 1)
    }

    const handlePlus = () => {
        setInputValue((prev) => prev + 1)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product')}>
                <div className={cx('product-image')}>
                    <Carousel
                        className={cx('custom-dot')}
                        customDot={<CustomDots />}
                        // draggable
                        // focusOnSelect={false}
                        infinite
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024,
                                },
                                items: 1,
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0,
                                },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464,
                                },
                                items: 1,
                            },
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        showDots
                        slidesToSlide={1}
                        swipeable
                    >
                        <img
                            src={details.image}
                            alt={details.name}
                            style={{
                                display: 'block',
                                height: '100%',
                                margin: 'auto',
                                width: '100%',
                            }}
                        />
                    </Carousel>
                </div>

                <div className={cx('product-details')}>
                    <h3 className={cx('product-name')}>{details.name}</h3>
                    <p>H??y l?? ng?????i ?????u ti??n ????nh gi?? s???n ph???m n??y!</p>
                    <div className={cx('product-code')}>SKU: 1054870</div>
                    <div className={cx('product-price-wrapper')}>
                        <div className={cx('product-price')}>
                            <div className={cx('title')}>Gi?? b??n l???</div>
                            <div className={cx('price')}>69.480??</div>
                        </div>
                        <div className={cx('product-status')}>
                            <span className={cx('title')}>T??nh tr???ng</span>
                            <span className={cx('status')}>C??n h??ng</span>
                        </div>
                    </div>
                    <div className={cx('product-shipping')}>
                        <div className={cx('title')}>V???n chuy???n</div>
                        <div className={cx('shipping-description')}>
                            Giao nhanh trong v??ng 2-4 ti???ng khi ????n h??ng ???????c x??c nh???n. C??c ????n h??ng ?????t sau 18:00 s???
                            ???????c giao tr?????c 12:00 s??ng ng??y h??m sau. Li??n h??? h??? tr???: 024 71066866
                        </div>
                    </div>
                    <div className={cx('product-type')}>
                        <div className={cx('title')}>Ch???n lo???i</div>
                        <div className={cx('button-list')}>
                            {details.types &&
                                details.types.map((type, index) => (
                                    <button
                                        className={cx('btn-type', type === tab && 'active')}
                                        key={index}
                                        onClick={() => setTab(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                        </div>
                    </div>
                    <div className={cx('quantity')}>
                        <div className={cx('title')}>S??? l?????ng</div>
                        <button className={cx('btn-minus')} onClick={handleMinus}>
                            <MinusIcon />
                        </button>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(parseInt(e.target.value))}
                            type='text'
                            className={cx('input-text')}
                            maxLength={2}
                            max={99}
                            min={1}
                            readOnly
                        />
                        <button className={cx('btn-plus')} onClick={handlePlus}>
                            <PlusIcon />
                        </button>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <button className={cx('btn-buy', 'active')}>
                            <div>MUA NGAY</div>
                        </button>
                        <button className={cx('btn-addCart')}>
                            <CartIcon width='25px' height='24px' className={cx('btn-add')} />
                            <div>TH??M V??O GI???</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('product-more_details')}>
                <div className={cx('product-description')}>
                    <div className={cx('title')}>M?? t???</div>
                </div>
                <div className={cx('product-information')}>
                    <div className={cx('title')}>Th??ng tin</div>
                    <div className={cx('product-about')}>
                        <div className={cx('product-brand')}>
                            <p>Xu???t X???</p>
                            <p className={cx('col-2')}>Vietnam</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Th??nh ph???n</p>
                            <p className={cx('col-2')}>??ang c???p nh???t</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>B???o qu???n</p>
                            <p className={cx('col-2')}>??ang c???p nh???t</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>H?????ng d???n s??? d???ng</p>
                            <p className={cx('col-2')}>??ang c???p nh???t</p>
                        </div>
                        <div className={cx('product-brand')}>
                            <p>Kh???i l?????ng</p>
                            <p className={cx('col-2')}>1.2Kg</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product-rating')}>
                <div className={cx('title')}>????nh gi?? s???n ph???m</div>
                <div className={cx('product-comments')}>
                    <div className={cx('comments-list')}>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Ch??a mua h??ng)</span>
                            </div>
                            <div>
                                <Stack spacing={1}>
                                    <Rating name='half-rating' readOnly defaultValue={1} precision={0.5} />
                                </Stack>
                            </div>
                            <div className={cx('content')}>Giao v??o bu???i tr??a t???m 11h 30 ho???c sau 16h30 chi???u.</div>
                            <div className={cx('created-by')}>
                                ????nh gi?? b???i <strong>H???ng</strong> ng??y <strong>11-04-2022</strong>
                            </div>
                        </div>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Ch??a mua h??ng)</span>
                            </div>
                            <div>
                                <Stack spacing={1}>
                                    <Rating name='half-rating' readOnly defaultValue={2} precision={0.5} />
                                </Stack>
                            </div>
                            <div className={cx('content')}>Giao v??o bu???i tr??a t???m 11h 30 ho???c sau 16h30 chi???u.</div>
                            <div className={cx('created-by')}>
                                ????nh gi?? b???i <strong>H???ng</strong> ng??y <strong>11-04-2022</strong>
                            </div>
                        </div>
                        <div className={cx('comments-item')}>
                            <div className={cx('comments-user')}>
                                <div className={cx('username')}>143 ga C</div>
                                <span className={cx('isBought')}>(Ch??a mua h??ng)</span>
                            </div>

                            <div className={cx('content')}>Giao v??o bu???i tr??a t???m 11h 30 ho???c sau 16h30 chi???u.</div>
                            <div className={cx('created-by')}>
                                ????nh gi?? b???i <strong>H???ng</strong> ng??y <strong>11-04-2022</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <Box
                    component='form'
                    sx={{
                        '& .MuiInputLabel-root': { fontSize: '1.4rem' },
                        '& .MuiOutlinedInput-root': { fontSize: '1.4rem' },
                        '& .MuiAutocomplete-root': { width: '100%' },
                        '& .MuiAutocomplete-option': { fontSize: '1.4rem' },
                        '& .MuiFormHelperText-root': { fontSize: '1.2rem' },
                        '& .MuiRating-root': { fontSize: '2.2rem' },
                    }}
                    noValidate
                    autoComplete='on'
                >
                    <div className={cx('product-userRating')}>
                        <div className={cx('rating-item')}>
                            <label htmlFor='rating' className={cx('rating-label', 'start')}>
                                ????nh gi??
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <div>
                                <Stack spacing={1}>
                                    <Rating
                                        name='half-rating'
                                        defaultValue={5}
                                        precision={0.5}
                                        size='large'
                                        id='rating'
                                    />
                                </Stack>
                            </div>
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='fullName' className={cx('rating-label')}>
                                Kh??ch h??ng
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='fullName'
                                label='Kh??ch h??ng'
                                // error
                                // helperText='Th??ng tin b???t bu???c'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='email' className={cx('rating-label')}>
                                Email
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField size='small' fullWidth id='email' label='Email' />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='phone' className={cx('rating-label')}>
                                ??i???n tho???i
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='phone'
                                label='??i???n tho???i'
                                // error
                                //  helperText='Th??ng tin b???t bu???c'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='title' className={cx('rating-label')}>
                                Ti??u ?????
                                <span className={cx('red-text')}>*</span>
                            </label>
                            <TextField
                                size='small'
                                fullWidth
                                id='title'
                                label='Ti??u ?????'
                                // error
                                //  helperText='Th??ng tin b???t bu???c'
                            />
                        </div>
                        <div className={cx('rating-item')}>
                            <label htmlFor='note' className={cx('rating-label')}>
                                N???i dung
                            </label>
                            <TextField
                                rows={3}
                                multiline
                                size='small'
                                fullWidth
                                id='note'
                                label='N???i dung '
                                // error
                                // helperText='Th??ng tin b???t bu???c'
                            />
                        </div>
                        <div className={cx('btn-rating')}>
                            <Button primary onClick={(e) => e.preventDefault()}>
                                ????nh gi??
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
            <div className={cx('relation-products')}>
                <div className={cx('title')}>S???n ph???m li??n quan</div>
            </div>
        </div>
    )
}

export default ProductDetails
