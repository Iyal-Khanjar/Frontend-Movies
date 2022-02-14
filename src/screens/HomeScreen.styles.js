import styled from "styled-components";


export const HomeContainer = styled.div`
    margin-top: 2rem;
	width: 95vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
export const IdbmTop =styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	gap:20px
`
export const IdbmTopHeader =styled.div`
	display:flex;
`
export const IdbmTopButton =styled.button`
	border:1px solid transparent;
	background:black;
	color:white;
	margin:2px;
`
export const IdbmTopBody= styled.div`
	display:flex;
	width:40vw;
	justify-content:space-between;
	align-items:center;
	height:200px;
`
export const ActorImg = styled.img`
	width:100px;
`
export const ActorCard = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	position:relative;
	background:#0c0404;
	width:200px;
	height:230px;
	padding:5px;
	border-radius:15px;
	box-sizing:border-box;
	overflow:hidden;
`
export const ActorPlace = styled.div`
	display:flex;
	justify-content:center;
	position:absolute;
	top:10px;
	left:10px;
`

export const Carousel =styled.div`
    box-sizing: border-box;
	overflow: hidden;
	height: 50rem;
	margin-left:70px;
	position: relative;
`