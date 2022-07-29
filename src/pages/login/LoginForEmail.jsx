import React, { useState } from 'react';
import { loginState } from '../../recoil/Atom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSection = styled.section`
	width: 100vw;
	height: 100vw;
	background-color: white;
`;
const LoginContainer = styled.article`
	width: 30rem;
	height: 25rem;
	margin: 6rem auto;
	box-shadow: 1px 1px 22px 2px rgba(0, 0, 0, 0.25);
	border-radius: 2.5rem;
`;
const LoginHeader = styled.h2`
	color: #5f6caf;
	font-size: 2rem;
	position: relative;
	top: 3rem;
	left: 12rem;
`;
const LoginButton = styled.button`
	width: 19rem;
	height: 3.2rem;
	font-size: 1rem;
	text-align: center;
	line-height: 3.2rem;
	position: relative;
	top: 6rem;
	left: 5.5rem;
	margin: 0.8rem 0;
	background-color: #5f6caf;
	color: #fff;
	border: none;
	border-radius: 22px;
`;

const LoginInput = styled.input`
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

function LoginForEmail() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setIsLoggedIn = useSetRecoilState(loginState);
	const navigate = useNavigate();

	//이메일과 비밀번호 올바른 형식인지 검사
	const emailRegex =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	const emailValidation = emailRegex.test(email);
	const passwordValidation = password.length < 8;

	const handleLoginButton = async e => {
		e.preventDefault();
		const loginData = { email, password };

		if (!emailValidation || passwordValidation) {
			alert('이메일 또는 비밀번호를 확인해 주세요.');
		}

		if (emailValidation && !passwordValidation) {
			try {
				const result = await axios({
					method: 'post',
					url: 'http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users',
					data: loginData,
				});

				localStorage.setItem('userId', result.data.userId);
				localStorage.setItem('token', result.data.token);
				setIsLoggedIn(true);

				navigate('/');
			} catch (err) {
				alert(err.response.data.error);
			}
		}
	};

	return (
		<LoginSection>
			<LoginContainer>
				<LoginHeader>로그인</LoginHeader>
				<LoginInput
					type="text"
					value={email}
					onChange={e => {
						setEmail(e.target.value);
					}}
					name="email"
					placeholder="이메일을 입력해 주세요."
				/>
				<LoginInput
					type="password"
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
					name="password"
					placeholder="비밀번호를 입력해 주세요."
				/>
				<LoginButton onClick={handleLoginButton}>로그인</LoginButton>
			</LoginContainer>
		</LoginSection>
	);
}

export default LoginForEmail;
