import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/Atom';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Nav = styled.nav`
	width: 100vw;
	height: 5rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
`;
const LogoContainer = styled.div`
	width: 7.5rem;
	height: 3rem;
	margin-left: 0.7rem;
	text-align: center;
	line-height: 3rem;
	cursor: pointer;
`;
const Img = styled.img`
	width: 100%;
	height: 100%;
`;
const NavUl = styled.ul`
	display: flex;
	align-items: center;
	margin-right: 5rem;
`;
const NavLi = styled.li`
	margin: 0 2rem;
	color: #5f6caf;
`;
const MenuUl = styled.ul`
	position: relative;
	top: 0.9rem;
	left: -4rem;
	width: 10rem;
	text-align: center;
	z-index: 999;
	box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
	background-color: #fff;
	border-radius: 10px;
`;
const MenuLi = styled.li`
	margin: 0;
	height: 3rem;
	width: 10rem;
	line-height: 3rem;
	color: #333;
	cursor: pointer;
	border-bottom: 1px solid #ccc;
	&:last-of-type {
		border: none;
	}
`;
const LoginBtn = styled(NavLink)`
	display: block;
	text-align: center;
	line-height: 3rem;
	width: 6rem;
	height: 3rem;
	background-color: #5f6caf;
	border: none;
	border-radius: 22px;
	color: #fff;
`;
const NavbarIcon = styled.img`
	border-radius: 50%;
	width: 3rem;
	cursor: pointer;
`;

function Navbar() {
	const modalMenu = useRef();
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
	const [isMenu, setisMenu] = useState(false);
	const [profileIcon, setProfileIcon] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('token')) setIsLoggedIn(true);
		axios
			.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/user', config)
			.then(({ data }) => setProfileIcon(data.profileImg));
		window.addEventListener('mousedown', handleModalOutside);
		return () => {
			window.removeEventListener('mousedown', handleModalOutside);
		};
	}, [profileIcon]);

	const handleModalOutside = event => {
		if (isMenu && !modalMenu.current.contains(event.target)) {
			setisMenu(!isMenu);
		}
	};

	const token = window.localStorage.getItem('token');
	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const handleClickList = () => {
		setisMenu(false);
	};

	return (
		<Nav>
			<LogoContainer
				onClick={() => {
					navigate('/');
				}}
			>
				<Img src="/img/travelog.jpg" />
			</LogoContainer>
			<NavUl style={{ marginRight: isMenu ? '-2rem' : '' }}>
				<NavLi>
					<NavLink to="/community">community</NavLink>
				</NavLi>
				{isLoggedIn && (
					<NavLi>
						<NavLink to="/mypage">my page</NavLink>
					</NavLi>
				)}
				{!isLoggedIn ? (
					<NavLi>
						<LoginBtn to="/login">login</LoginBtn>
					</NavLi>
				) : (
					<NavLi>
						<NavbarIcon
							src={profileIcon || '/img/default.png'}
							onClick={() => {
								setisMenu(!isMenu);
							}}
							style={{ marginTop: isMenu ? '12.4rem' : '' }}
						/>

						{isMenu && (
							<MenuUl ref={modalMenu}>
								<MenuLi>
									<NavLink to="/passwordcheck" onClick={handleClickList}>
										회원 정보 수정
									</NavLink>
								</MenuLi>
								<MenuLi>
									<NavLink to="/main" onClick={handleClickList}>
										여행 페이지 이동
									</NavLink>
								</MenuLi>
								<MenuLi>
									<NavLink onClick={handleClickList} to="/mypage">
										마이페이지
									</NavLink>
								</MenuLi>
								<MenuLi
									onClick={() => {
										if (window.confirm('로그아웃 하시겠습니까?')) {
											localStorage.clear();
											setIsLoggedIn(false);
											setisMenu(false);
											navigate('/login');
										} else {
											return;
										}
									}}
								>
									로그아웃
								</MenuLi>
							</MenuUl>
						)}
					</NavLi>
				)}
			</NavUl>
		</Nav>
	);
}

export default Navbar;
