import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RouteBox from './RouteBox';

function TravelPost({ title, username, profileImg, cateCity, img, markedData, id }) {
	const [placeData, setPlaceData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const parsedTags = JSON.parse(markedData);
		const tempArr = [];
		if (parsedTags === null) {
			return;
		} else {
			parsedTags.forEach(i => {
				const data = { category: i.categoryGroupName, name: i.placeName, placeUrl: i.placeUrl };
				tempArr.push(data);
			});
			setPlaceData(tempArr);
		}
	}, [markedData]);

	const clickHandler = () => {
		navigate(`/view/${id}`);
	};

	return (
		<PostContainer onClick={clickHandler}>
			<Thumbnail src={img} />
			<PositionData>📍{cateCity}</PositionData>
			<Title>{title}</Title>
			<ProfilePic src={profileImg} />
			<PostWriter>{username}</PostWriter>
			<RouteContainer onClick={e => e.stopPropagation()}>
				{placeData.map((i, idx) => {
					return <RouteBox key={idx} category={i.category} name={i.name} url={i.placeUrl} />;
				})}
			</RouteContainer>
		</PostContainer>
	);
}

export default TravelPost;

const PostContainer = styled.div`
	width: 45rem;
	height: 20rem;
	border-radius: 22px;
	background-color: #fff;
	box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
	padding: 2rem;
	margin-bottom: 3rem;
	box-sizing: border-box;
	position: relative;
	top: 7rem;
	left: calc(50vw - 22.5rem);
	cursor: pointer;
`;

const Thumbnail = styled.img`
	width: 10rem;
	height: 12rem;
`;
const PositionData = styled.p`
	display: block;
	width: 10rem;
	height: 3rem;
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
	line-height: 3rem;
	margin-top: 1.5rem;
`;

const Title = styled.p`
	display: block;
	width: 30rem;
	height: 3rem;
	font-size: 1.5rem;
	font-weight: bold;
	line-height: 3rem;
	position: relative;
	padding-left: 1rem;
	top: -16.5rem;
	left: 11.5rem;
`;
const ProfilePic = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 1.5rem;
	background-color: black;
	position: relative;
	top: -15.6rem;
	left: 12.3rem;
`;
const PostWriter = styled.p`
	position: relative;
	top: -17.3rem;
	left: 15rem;
`;
const RouteContainer = styled.div`
	display: flex;
	width: 29rem;
	height: 10rem;
	overflow-x: auto;
	overflow-y:clip;
	position: relative;
	top: -16rem;
	left: 12rem;
	&::-webkit-scrollbar {
		width: 5rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #eee;
		border-radius: 5rem;
	}
	&::-webkit-scrollbar-track {
		border: none;
		background-color: #fff;
	}
`;
