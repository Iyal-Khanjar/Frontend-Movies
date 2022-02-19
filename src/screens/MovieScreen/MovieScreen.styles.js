import styled from "styled-components";

export const CarouselActors = styled.div`
    box-sizing: border-box;
	overflow: hidden;
	height: 26rem;
    margin-bottom:1rem;
	position: relative;
`

export const ActorNameAndPic = styled.div` 
	display: flex;
	flex-direction: column;
	margin: 0.5rem;
	width: 17rem;
	height: 15rem;
	background-color: #061f24;
	justify-content: center;
	align-items: center;
	padding: 1rem;
`
export const MovieContainer = styled.div` 
	width: 80vw;
	margin: 0 10rem;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	background-color:${(props) => (props.color)};
	
`