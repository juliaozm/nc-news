import {useState} from 'react';

export const ArticlesSortBy = ({setSelectedSortBy}) => {
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')

    const handleSelectSort = e => {
        setSelectedSortBy(currSearch => ({...currSearch, sort_by : e.target.value }))
        setSortBy(e.target.value)
    }

    const handleSelectOrder = e => {
        setSelectedSortBy(currSearch => ({...currSearch, order : e.target.value }))
        setOrder(e.target.value)
    }

    return (
        <section className='sort-section'>
            <label> Sort by:
                <select name="sort_by" id="sort_by" defaultValue={sortBy} onChange={handleSelectSort}>
                    <option value="created_at">date</option>
                    <option value="votes">votes</option>
                    <option value="comment_count">comment count</option>
                </select>
            </label>
            <label>Order:
                <select name="order" id="order" defaultValue={order} onChange={handleSelectOrder}>
                    <option value="desc">descending</option>
                    <option value="asc">ascending</option>
                </select>
            </label>
        </section>
    )
}