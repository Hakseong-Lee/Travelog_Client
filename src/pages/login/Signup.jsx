import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { loginState } from '../../recoil/Atom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const SignupSection = styled.section`
	width: 100vw;
	height: 100vw;
	background-color: white;
`;
const SignupContainer = styled.article`
	width: 30rem;
	height: 40rem;
	margin: 6rem auto;
	box-shadow: 1px 1px 22px 2px rgba(0, 0, 0, 0.25);
	border-radius: 38px;
`;
const SignupHeader = styled.h2`
	color: #5f6caf;
	font-size: 2rem;
	position: relative;
	top: 3rem;
	left: 12rem;
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
`;
const InvalidInput = styled.p`
	font-size: 0.7rem;
	color: #ff8364;
	position: relative;
	top: 4.8rem;
	left: 6.8rem;
`;

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const setIsLoggedIn = useSetRecoilState(loginState);
	const navigate = useNavigate();

	const emailRegex =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	const emailValidation = emailRegex.test(email);
	const passwordValidation = password.length < 8;
	const passwordConfirmValidation = password !== passwordConfirm;
	const ageValidation = age.length < 1;

	let ageData = 0;

	//입력받은 생년월일로 연령대 계산
	const getAgeInfo = input => {
		const date = new Date().getFullYear();
		const birth = parseInt(input.slice(0, 4));

		ageData = date - birth + 1;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (name === '') {
			alert('이름을 확인해 주세요.');
		} else if (!emailValidation) {
			alert('이메일을 확인해 주세요.');
		} else if (passwordValidation || passwordConfirmValidation) {
			alert('비밀번호를 확인해 주세요.');
		} else if (ageValidation) {
			alert('생년월일 정보를 확인해 주세요');
		}

		getAgeInfo(age);

		//모든 유효성 검사를 통과한다면 백에 회원가입 요청
		if (emailValidation && !passwordConfirmValidation && !passwordValidation && !ageValidation) {
			try {
				const data = { nickname: name, email, password, age: ageData };
				const result = await axios({
					method: 'post',
					url: 'http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/register',
					data: data,
				});
				//로그인 성공시 토큰을 로컬 스토리지에 저장
				//세션이 만료되어도 로그인을 유지하기 위해 로컬 스토리지를 사용
				localStorage.setItem('token', result.data.token);
				setIsLoggedIn(true);

				navigate('/login');
			} catch (err) {
				console.error(err.response.data.error);
				alert(err.response.data.error);
			}
		}
	};

	return (
		<SignupSection>
			<SignupContainer>
				<SignupHeader>회원가입</SignupHeader>
				<form>
					<SignupInput
						name="name"
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
						placeholder="이름을 입력해 주세요."
					/>
					<SignupInput
						name="email"
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
						placeholder="이메일을 입력해 주세요."
					/>
					{!emailValidation && <InvalidInput> * 이메일 형식이 올바르지 않습니다.</InvalidInput>}
					<SignupInput
						name="password"
						value={password}
						type="password"
						onChange={e => {
							setPassword(e.target.value);
						}}
						placeholder="비밀번호를 입력해 주세요."
					/>
					{passwordValidation && <InvalidInput> * 8자 이상 입력해 주세요.</InvalidInput>}
					<SignupInput
						name="passwordConfirm"
						value={passwordConfirm}
						type="password"
						onChange={e => {
							setPasswordConfirm(e.target.value);
						}}
						placeholder="비밀번호를 다시 입력해 주세요."
					/>
					{passwordConfirmValidation && (
						<InvalidInput> * 비밀번호가 일치하지 않습니다.</InvalidInput>
					)}

					<SignupInput
						name="date"
						value={age}
						type="date"
						min="1900-01-01"
						max="9999-12-31"
						onChange={e => {
							setAge(e.target.value);
						}}
						placeholder="생년월일을 입력해 주세요."
					/>
					{ageValidation && <InvalidInput> * 생년월일 정보가 없습니다.</InvalidInput>}
					<SignupButton onClick={handleSubmit}>회원가입</SignupButton>
				</form>
			</SignupContainer>
		</SignupSection>
	);
}

export default Signup;
