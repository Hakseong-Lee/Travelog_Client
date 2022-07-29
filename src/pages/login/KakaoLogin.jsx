import React from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './OAuth';

const KakaoLogin = () => {
	const RedirectForAuth = e => {
		window.location.assign(KAKAO_AUTH_URL);
	};
	return (
		<SocialButton onClick={RedirectForAuth}>
			<SocialImage />
		</SocialButton>
	);
};

export default KakaoLogin;

const SocialButton = styled.div`
	display: block;
	width: 19rem;
	height: 3.2rem;
	font-size: 1rem;
	text-align: center;
	line-height: 3.2rem;
	background-color: #fee500;
	position: relative;
	top: 5rem;
	left: 5.5rem;
	margin: 0.8rem 0;
	border-radius: 22px;
`;
const SocialImage = styled.div`
	height: 3rem;
	background: url('img/kakao_login_large_narrow.png') no-repeat center;
	background-size: contain;
	cursor: pointer;
`;
