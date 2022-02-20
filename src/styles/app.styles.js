import styled from "styled-components";


export const AppContainer = styled.div`
	height: 100%;
`;

export const Header = styled.div`
    margin-bottom: 2rem;
    font-size: 2rem;
    height: 10vh;
    background-color: black;
    display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
    align-content:center;
    
  }
  
`;
export const Nav1 = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	justify-content: space-between;
    z-index: 1000;
@media (max-width: 815px) {
    position: relative;
    left:0;
    top:10rem;
    background-color:black;
    height:50vh;
    justify-content: space-around;

`;
export const Nav2 = styled.div`
    height: 100%;
    display: flex;
	flex-wrap: wrap;
    min-width:700px;
	justify-content: space-between;
	align-items: center;
`;
export const NavItem = styled.div`
    border-radius: 15px;
    color:white;
    padding:5px;
    &:hover {
        background: white;
        color:black;
      }

`;
