import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  opacity: 0.7;
  width: ${(props) => (props.width > 500 ? "35rem" : null)};
  background-color:grey; 
  border-radius: 10px;
  height:5rem;
  width:20rem;
  padding: 1rem;
  font-size: 1.7rem;
  color: var(--text-white);
  border-bottom: 1px solid white;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: var(--text-dark);
    background-color: var(--primary-color-light);
  }
`;
export const SkContainer = styled.div`
  background-color:grey; 
  border-radius: 10px;
  height:5rem;
  width:20rem;
  padding: 1rem;
  border-bottom: 1px solid white;
  transition: all 0.3s;
  cursor: pointer;
  opacity: 0.7;
`;
export const Search = styled.div`
 position: relative;
`;
export const SearchResults = styled.div`
 position: absolute;
 z-index: 1;
`;

export const Img = styled.img`
  height: 5rem;
  width: 4rem;
  margin-right: 1rem;
  align-self: center;
`;

export const IconAndYearContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
   width: 8rem;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  &:focus {
    width: 20%;
  }
`;
