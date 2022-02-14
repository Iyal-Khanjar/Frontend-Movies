import React from 'react'
import ReactPaginate from 'react-paginate'

function PaginateUnknowLength(props) {
    return <div>
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={props.pageCount}
            onPageChange={props.handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />
    </div>

}

export default PaginateUnknowLength