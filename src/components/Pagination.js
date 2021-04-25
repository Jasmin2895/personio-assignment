import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <div
                    href={null}
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={
                        page === currentPage ? 'active' : 'page-item'
                    }
                >
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;
