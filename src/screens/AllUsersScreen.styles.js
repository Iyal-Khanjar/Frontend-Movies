import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;
export const TableTbodyTr = styled.tr`
    &:nth-of-type(odd) {
        background-color: #f4f4f4;
        color: black;
    }
`;

export const TableTd = styled.td`
    text-align: left;
	border: 0.1rem solid #e4e4e4;
	padding: 0.5rem;
`;
export const TableTh = styled.th`
    text-align: left;
    border: 0.1rem solid #e4e4e4;
    padding: 0.5rem;
`;
export const TableButton = styled.button`
    margin: 0 0.2rem;
`

