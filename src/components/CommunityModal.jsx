import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { communityState } from '../recoil/Atom';
import { IoClose } from 'react-icons/io5';
import CommentForCommunity from './CommentForCommunity';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginUserId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

function CommunityModal({ title, img, name, content, id, userId }) {
	const [click, setClick] = useRecoilState(communityState);
	const [comments, setComments] = useState([]);
	const [commentInput, setCommentInput] = useState('');
	const [randomId, setRandomId] = useState(0);
	const navigate = useNavigate();

	const postId = id;

	useEffect(() => {
		(async () => {
			try {
				const data = await axios.get(
					`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/comments/${postId}`,
				);
				setComments(data.data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
	const clickHandler = () => {
		setClick({ state: false, id: '' });
	};
	const commentInputHandler = e => {
		setCommentInput(e.target.value);
	};
	const commentButtonHandler = async () => {
		setRandomId(new Date().getTime());
		await axios.post(
			`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/comments/register/${postId}`,
			{
				content: commentInput,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await axios.get(
			`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/comments/${postId}`,
		);
		setComments(data.data);
		setCommentInput('');
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/${postId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (e) {
			console.error(e);
		}
		setClick({ state: false, id: '' });
		window.location.reload();
	};
	return (
		<ModalBG onClick={clickHandler}>
			<Modal onClick={e => e.stopPropagation()}>
				<Title>{title}</Title>
				<PostImg src={img} />
				<PostWriter>{name}</PostWriter>
				<PostContent>{content}</PostContent>
				{Number(loginUserId) === Number(userId) && (
					<DeleteButton onClick={handleDelete}>삭제</DeleteButton>
				)}
				<CommentBox>
					<CommentContainer>
						{comments.map((i, idx) => {
							return (
								<CommentForCommunity
									key={idx}
									user={i.User.nickname || 'anonymous'}
									img={i.User.profileImg || 'img/default.png'}
									comment={i.content}
								/>
							);
						})}
					</CommentContainer>
				</CommentBox>
				<CommentInput onChange={commentInputHandler} value={commentInput} />
				<CommentButton onClick={commentButtonHandler}>send</CommentButton>
				<CloseButton onClick={clickHandler} />
			</Modal>
		</ModalBG>
	);
}

export default CommunityModal;

const ModalBG = styled.article`
	width: 100vw;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.5);
	position: fixed;
	top: 5rem;
	left: 0;
`;
const Modal = styled.div`
	width: 60rem;
	height: 30rem;
	background-color: #fff;
	box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.25);
	border-radius: 22px;
	position: fixed;
	top: 10rem;
	left: calc(50vw - 30rem);
`;
const Title = styled.p`
	width: 25rem;
	font-weight: bold;
	font-size: 1.8rem;
	position: relative;
	top: 3rem;
	left: 3rem;
`;
const PostImg = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	background-color: black;
	position: relative;
	top: 4.5rem;
	left: 3rem;
`;

const PostWriter = styled.p`
	display: block;
	width: 6.5rem;
	position: relative;
	top: 2.7rem;
	left: 6rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const PostContent = styled.p`
	display: block;
	width: 23rem;
	position: relative;
	left: 3rem;
	top: 6rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const CommentBox = styled.div`
	width: 25rem;
	height: 28rem;
	border-left: 1px solid #ccc;
	position: relative;
	top: -5rem;
	left: 30rem;
`;
const CommentContainer = styled.div`
	width: 22rem;
	height: 22.5rem;
	position: absolute;
	top: 1rem;
	left: 4rem;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const CommentInput = styled.input`
	width: 18.5rem;
	height: 1.5rem;
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 12px 0 0 12px;
	position: absolute;
	top: 25rem;
	left: 34rem;
`;
const CommentButton = styled.button`
	display: block;
	width: 3.3rem;
	height: 2.21rem;
	border: none;
	border-radius: 0 12px 12px 0;
	background-color: #5f6caf;
	color: #fff;
	position: absolute;
	top: 25rem;
	left: 53rem;
`;

const CloseButton = styled(IoClose)`
	font-size: 2rem;
	position: absolute;
	top: 1.5rem;
	left: 56rem;
	cursor: pointer;
`;

const DeleteButton = styled.div`
	width: 4rem;
	height: 2rem;
	font-weight: 300;
	position: absolute;
	top: 2.2rem;
	left: 25rem;
	border-radius: 10px;
	text-align: center;
	line-height: 2rem;
	border: 1px solid #ff8364;
	cursor: pointer;
	&:hover {
		background-color: #ff8364;
		color: #fff;
	}
`;
