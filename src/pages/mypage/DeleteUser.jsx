import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const SignupSection = styled.section`
	width: 100vw;
	height: 100vw;
	background-color: white;
`;
const SignupContainer = styled.article`
	width: 30rem;
	height: 23rem;
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
`;
const InvalidInput = styled.p`
	font-size: 0.7rem;
	color: #ff8364;
	position: relative;
	top: 4.8rem;
	left: 6.8rem;
`;
const NavUl = styled.ul`
	display: flex;
	align-items: center;
	margin-right: 3rem;
`;
const NavLi = styled.li`
	margin: 0 2rem;
	color: #5f6caf;
`;
const MenuUl = styled(NavUl)`
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 15vw;
	box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	text-align: center;
	left: -0.5rem;
	top: 11rem;
	background-color: #edf7fa;
`;
const MenuLi = styled(NavLi)`
	color: #5f6caf;
	margin: 0;
	height: 3rem;
	width: 15vw;
	line-height: 3rem;
	color: black;
	cursor: pointer;
	font-size: 22px;
	&:hover {
		background-color: #5f6caf;
		color: #ffffff;
	}
`;
//회원 정보 변경창에 들어가기전 패스워드 확인
function DeleteUser() {
	const [password, setPassword] = useState('');
	const token = window.localStorage.getItem('token');
	//입력된 정보가 올바른 형식인지 검사

	const handleSubmit = async e => {
		e.preventDefault();
		if (!password) {
			alert('비밀번호를 확인해 주세요.');
		}

		//회원가입 요청

		try {
			const userData = await axios
				.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/user', {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then(e => e.data);
			await axios({
				method: 'delete',
				url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/${userData.id}`,
				headers: { Authorization: `Bearer ${token}` },
				data: {
					password,
				},
			});
			localStorage.clear();
			window.location.href = '/login';
		} catch (err) {
			console.error(err.stack);
			alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
		}
	};

	return (
		<>
			<MenuUl>
				<MenuLi>
					<NavLink to="/editprofile">회원정보 수정</NavLink>
				</MenuLi>
				<MenuLi>
					<NavLink to="/changepassword">비밀번호 변경</NavLink>
				</MenuLi>
				<MenuLi>
					<NavLink to="/deleteuser">회원탈퇴</NavLink>
				</MenuLi>
			</MenuUl>
			<SignupSection>
				<SignupContainer>
					<SignupHeader>회원 탈퇴 확인</SignupHeader>
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
						<SignupButton onClick={handleSubmit}>회원 탈퇴</SignupButton>
					</form>
				</SignupContainer>
			</SignupSection>
		</>
	);
}

export default DeleteUser;
