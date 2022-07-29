import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function TitleCard(props) {
	const navigate = useNavigate();
	const clickCard = data => {
		navigate(`main?place=${data}`);
	};
	return (
		<Card onClick={() => clickCard(props.place)}>
			<ImgContainer img={props.img} />
			<CardTitle>{props.place}</CardTitle>
		</Card>
	);
}

export default TitleCard;

const Card = styled.div`
	width: 12rem;
	height: 15rem;
	margin: 2.5rem auto;
	border-radius: 20px;
	overflow: hidden;
	cursor: pointer;
`;
const ImgContainer = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${props => props.img});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	transition: 0.5s;
	&:hover {
		transform: scale(1.1);
	}
`;

const CardTitle = styled.div`
	width: 12rem;
	height: 5rem;
	color: #fff;
	letter-spacing: 0.2rem;
	font-size: 1.5rem;
	font-weight: 400;
	line-height: 5rem;
	text-align: center;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
	opacity: 0.9;
	border-radius: 0 0 20px 20px;
	position: relative;
	bottom: 5rem;
`;
