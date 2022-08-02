import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../../recoil/Atom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
function Kakao() {
	const navigate = useNavigate();
	const code = new URL(window.location.href).searchParams.get('code');
	const grant_type = 'authorization_code';
	const REDIRECT_URI = 'http://kdt-sw2-busan-team01.elicecoding.com:5001/auth';
	const setIsLoggedIn = useSetRecoilState(loginState);
	const getData = data => {
		return axios.create({
			baseURL: 'https://kapi.kakao.com/v2/user/me',
			headers: { Authorization: `Bearer ${data}` },
		});
	};
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.post(
					`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
					{ headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } },
				);
				console.log(res);
				const accessToken = res.data.access_token;
				const userData = await getData(accessToken).get();
				console.log(userData);
				const toServer = await axios.post('http://localhost:8000/api/users/kakao', {
					data: userData,
				});
				localStorage.setItem('userId', toServer.data.userId);
				localStorage.setItem('token', toServer.data.token);
				setIsLoggedIn(true);
				navigate('/');
			} catch (e) {
				console.error(e);
				navigate('/');
			}
		})();
	}, []);
	return <div></div>;
}
export default Kakao;
