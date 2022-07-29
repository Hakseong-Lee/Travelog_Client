import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function QnAWriting() {
	const [input, setInput] = useState('');
	const [textarea, setTextarea] = useState('');
	const navigate = useNavigate();

	const data = {
		title: input,
		content: textarea,
		type: 'qna',
	};
	const token = localStorage.getItem('token');

	const clickHandler = async () => {
		try {
			await axios.post(
				'http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/register',
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			navigate('/community');
		} catch (e) {
			console.error(e);
		}
	};
	const navigateHandler = () => {
		navigate('/community');
	};
	return (
		<WritingSection>
			<WritingContainer>
				<WritingTitle
					value={input}
					onChange={e => {
						setInput(e.target.value);
					}}
				/>
				<WritingTextArea
					value={textarea}
					onChange={e => {
						setTextarea(e.target.value);
					}}
				/>
				<WritingButtonContainer>
					<WritingButton
						onClick={navigateHandler}
						style={{ backgroundColor: '#edf7fa', color: '#000' }}
					>
						뒤로가기
					</WritingButton>
					<WritingButton onClick={clickHandler}>작성하기</WritingButton>
				</WritingButtonContainer>
			</WritingContainer>
		</WritingSection>
	);
}

export default QnAWriting;

const WritingSection = styled.section`
	width: 100vw;
	height: 100vh;
`;
const WritingContainer = styled.div`
	width: 45rem;
	height: 25rem;
	border-radius: 22px;
	background-color: #fff;
	box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
	position: relative;
	top: 5rem;
	left: calc(50vw - 22.5rem);
`;
const WritingTitle = styled.input`
	width: 35rem;
	height: 2rem;
	margin: 4rem 5rem 2rem;
	padding: 0.5rem;
	border-radius: 10px;
	border: 1px solid #aaa;
	box-sizing: border-box;
`;
const WritingTextArea = styled.textarea`
	width: 35rem;
	height: 8rem;
	margin: 0rem 5rem;
	padding: 0.5rem;
	border-radius: 10px;
	border: 1px solid #aaa;
	box-sizing: border-box;
	resize: none;
`;
const WritingButtonContainer = styled.div`
	width: 20rem;
	display: flex;
	justify-content: space-around;
	margin: 3rem auto;
`;
const WritingButton = styled.button`
	width: 6rem;
	height: 3rem;
	background-color: #5f6caf;
	text-align: center;
	line-height: 3rem;
	color: #fff;
	border: none;
	border-radius: 15px;
`;
