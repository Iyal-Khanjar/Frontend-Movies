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
	box-shadow: 0 20px 30px 0 rgba(0,0,0,1);
	border-radius: 20px;
	background-color:${(props) => (props.color.DarkVibrant?.hex)};
	${'' /* background-color:linear-gradient(to bottom left,${(props) => (props.color.DarkVibrant?.hex)}}; */}
	${'' /* linear-gradient(to bottom left, #33ccff 0%, #ff99cc 100%); */}

	
`