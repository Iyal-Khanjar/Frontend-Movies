import React from 'react';
import ReactPaginate from 'react-paginate';

function Paginate(props) {
    return <div>
        <ReactPaginate
            previousLabel="<< Previous"
            nextLabel='Next >>'
            breakLabel='...'
            pageCount={props.numberOfPages}
            marginPagesDisplayed={props.marginPagesDisplayed}
            onPageChange={props.handlePageClick}
            forcePage={props.pageCount - 1}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />
    </div>;
}

export default Paginate;
