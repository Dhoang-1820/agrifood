import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchIcon } from '~/components/Icons'
import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '~/hooks'

import Tippy from '@tippyjs/react/headless'
import classnames from 'classnames/bind'
import styles from './Search.module.scss'
import ResultItem from '../ResultItem/ResultItem'

const cx = classnames.bind(styles)

function Search() {
    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debouce = useDebounce(searchValue, 500)

    const inputRef = useRef()

    useEffect(() => {
        if (!debouce.trim()) {
            setSearchResults([])
            return
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouce)}&type=less`)
            .then((response) => response.json())
            .then((res) => {
                setSearchResults(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

        // const fechAPI = async () => {
        //     setLoading(true)

        //     const result = await searchServices.search(debouce)
        //     setSearchResults(result)

        //     setLoading(false)
        // }
        // fechAPI()
    }, [debouce])

    const handleClear = () => {
        setSearchValue('')
        setSearchResults([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(true)
    }

    const handleSearch = (e) => {
        const inputValue = e.target.value
        if (!inputValue.startsWith(' ')) {
            setSearchValue(inputValue)
        }
    }

    return (
        //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <Tippy
                offset={[0, 2]}
                placement='bottom'
                interactive
                visible={showResult && searchResults.length > 0}
                onClickOutside={() => setShowResult(false)}
                render={(attrs) => (
                    <div className={cx('wrapper-results')} tabIndex='-1' {...attrs}>
                        <h4>S???n ph???m g???i ??</h4>
                        <div className={cx('result-list', 'scrollbar-custom')}>
                            {searchResults.map((result) => (
                                <ResultItem key={result.id} data={result} />
                            ))}
                        </div>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Nh???p t??n s???n ph???m, m?? s???n ph???m, t??? kho?? c???n t??m...'
                        onChange={handleSearch}
                        onFocus={handleHideResult}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('btn-search')}>
                        <SearchIcon className={cx('icon-search')} />
                    </button>
                </div>
            </Tippy>
        </div>
    )
}

export default Search
