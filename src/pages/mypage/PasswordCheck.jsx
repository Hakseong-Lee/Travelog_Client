import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupSection = styled.section`
	width: 100vw;
	height: 100vw;
	background-color: white;
`;
const SignupContainer = styled.article`
	width: 30rem;
	height: 24rem;
	margin: 6rem auto;
	box-shadow: 1px 1px 22px 2px rgba(0, 0, 0, 0.25);
	border-radius: 38px;
`;
const SignupHeader = styled.h2`
	color: #5f6caf;
	font-size: 2rem;
	position: relative;
	top: 3rem;
	left: 9rem;
`;
const SignupInput = styled.input`
	width: 18rem;
	height: 2.5rem;
	padding: 0.8rem;
	box-sizing: border-box;
	position: relative;
	top: 6rem;
	left: 6rem;
	margin-bottom: 1.8rem;
	color: #5f6caf;
	background-color: #edf7fa;
	border-radius: 10px;
	border: none;
`;
const SignupButton = styled.button`
	display: block;
	width: 18rem;
	height: 3.2rem;
	font-size: 1rem;
	text-align: center;
	line-height: 3.2rem;
	margin-bottom: 1.5rem;
	position: relative;
	top: 8rem;
	left: 6rem;
	background-color: #5f6caf;
	color: #fff;
	border: none;
	border-radius: 22px;
	cursor: pointer;
`;

//회원 정보 변경창에 들어가기전 패스워드 확인
function PasswordCheck() {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	//입력된 정보가 올바른 형식인지 검사
	const token = window.localStorage.getItem('token');
	// const config = {
	//   headers: { Authorization: `Bearer ${token}` },
	//   data: { paassword: password },
	// }

	const handleSubmit = async e => {
		e.preventDefault();
		if (password === '') {
			alert('비밀번호를 확인해 주세요.');
		}
		try {
			const isPassword = await axios({
				method: 'post',
				url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/user/check`,
				headers: { Authorization: `Bearer ${token}` },
				data: {
					password,
				},
			}).then(e => e.data.isPassword);
			if (isPassword) {
				navigate('/editprofile');
			} else {
				alert('비밀번호가 틀립니다');
			}
		} catch (err) {
			//alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`)
		}
	};

	return (
		<SignupSection>
			<SignupContainer>
				<SignupHeader>비밀 번호 확인</SignupHeader>
				<form>
					<SignupInput
						name="password"
						value={password}
						type="password"
						onChange={e => {
							setPassword(e.target.value);
						}}
						placeholder="비밀번호를 입력해 주세요."
					/>
					<SignupButton onClick={handleSubmit}>확인</SignupButton>
				</form>
			</SignupContainer>
		</SignupSection>
	);
}

export default PasswordCheck;
