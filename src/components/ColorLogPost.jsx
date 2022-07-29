import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ColorLogPost({ title, mainImg, tag, id }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/view/${id}`);
	};
	return (
		<PostContainer onClick={handleClick}>
			<PostThumbnail src={mainImg} />
			<PostTitle>{title}</PostTitle>
			<TravelTagBox>
				{tag.map((i, idx) => {
					return <Tag key={idx}>{i}</Tag>;
				})}
			</TravelTagBox>
		</PostContainer>
	);
}

export default ColorLogPost;

const PostContainer = styled.article`
	width: 18rem;
	height: 6.7rem;
	background-color: #edf7fa;
	margin: 1rem auto;
	border-radius: 10px;
`;
const PostThumbnail = styled.img`
	width: 4rem;
	height: 4rem;
	margin: 1.5rem;
	border-radius: 10px;
`;
const PostTitle = styled.h2`
	display: block;
	width: 10rem;
	position: relative;
	top: -5.2rem;
	left: 6.5rem;
	font-size: 1.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const TravelTagBox = styled.div`
	display: flex;
	width: 11rem;
	height: 4rem;
	overflow: scroll;
	position: relative;
	top: -5rem;
	left: 6rem;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const Tag = styled.div`
	font-size: 0.7rem;
	min-width: 2rem;
	height: 2rem;
	margin: 0.5rem;
	border-radius: 10px;
	background-color: #fff;
	text-align: center;
	line-height: 2rem;
`;
