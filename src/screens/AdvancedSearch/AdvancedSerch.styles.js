import styled from "styled-components";


export const SearchContainer = styled.div`
    display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const AdvancedSearchSelect =styled.select`
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

export const FillterSearch =styled.div`
    display: flex;
	justify-content: center;
	align-items: center;
    gap:1.5rem;
    margin-bottom: 3rem;
`;

export const SearchInputButton =styled.input`
padding: 1rem;
border-radius: 0.5rem;
border: 0.1rem #a4a4a4 solid;
font-size: 1.6rem;
font-family: Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
cursor: pointer;
    &:hover{
        border: 0.1rem #404040 solid;
    }`
export const SearchInput =styled.input`
padding: 1rem;
border-radius: 0.5rem;
border: 0.1rem #a4a4a4 solid;
font-size: 1.6rem;
font-family: Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

`

export const AdvancedSearchDiv =styled.div`
    width:98vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;
`