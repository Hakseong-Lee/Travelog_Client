import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { NavLink, useNavigate } from 'react-router-dom';
import { S3Upload, S3getFileURL } from '../../components/S3';

const SignupSection = styled.section`
	width: 100vw;
	height: 100vw;
	background-color: white;
`;
const SignupContainer = styled.article`
	width: 40rem;
	height: 44rem;
	margin: 6rem auto;
	box-shadow: 1px 1px 22px 2px rgba(0, 0, 0, 0.25);
	border-radius: 38px;
`;
const SignupHeader = styled.h2`
	color: #5f6caf;
	font-size: 2rem;
	position: relative;
	top: 3rem;
	left: 14rem;
`;
const SignupInput = styled.input`
	display: block;
	width: 22rem;
	height: 2.5rem;
	padding: 0.8rem;
	box-sizing: border-box;
	position: relative;
	top: 6rem;
	left: 9rem;
	margin-bottom: 1.8rem;
	color: #5f6caf;
	background-color: #edf7fa;
	border-radius: 10px;
	border: none;
`;
const SignupButton = styled.button`
	display: block;
	width: 22rem;
	height: 3.2rem;
	font-size: 1rem;
	text-align: center;
	line-height: 3.2rem;
	margin-bottom: 1.5rem;
	position: relative;
	top: 6rem;
	left: 9rem;
	background-color: #5f6caf;
	color: #fff;
	border: none;
	border-radius: 22px;
`;

const AddressButton = styled.button`
	width: 6rem;
	height: 2.5rem;
	font-size: 1rem;
	text-align: center;
	line-height: 2.5rem;
	position: relative;
	top: 1.7rem;
	left: 25rem;
	background-color: #5f6caf;
	color: #fff;
	border: none;
	border-radius: 0 22px 22px 0;
`;
const MenuUl = styled.ul`
	position: absolute;
	width: 10rem;
	box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	text-align: center;
	top: 11rem;
	background-color: #fff;
	z-index: 999;
`;
const MenuLi = styled.li`
	color: #5f6caf;
	height: 3rem;
	width: 10rem;
	line-height: 3rem;
	color: black;
	cursor: pointer;
	font-size: 22px;
	&:hover {
		background-color: #5f6caf;
		color: #ffffff;
	}
`;

function EditProfile() {
	const [userName, setUserName] = useState('');
	const [userNickname, setUserNickname] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [popup, setPopup] = useState('false');
	const [address, setAddress] = useState('');
	const [address2, setAddress2] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [userId, setUserId] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/user', config)
			//.then(({ data }) => setUserData(data));
			.then(({ data }) => {
				setUserName(data.name);
				setUserNickname(data.nickname);
				setPhoneNumber(data.phoneNumber);
				setUserId(data.id);
			});
	}, []);

	//axios bearer token
	const token = window.localStorage.getItem('token');
	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	//데이터 전송
	const handleSubmit = async e => {
		e.preventDefault();

		const fileKey = profileImage.name;
		let profileImg;
		if (profileImage) {
			S3Upload(profileImage);
			profileImg = S3getFileURL(`upload/${fileKey}`);
		} else {
			profileImg = S3getFileURL(`upload/default.png`);
		}

		let resultData = { userName, userNickname, phoneNumber, address, profileImg };

		//변경된 값으로 수정
		try {
			await axios({
				method: 'patch',
				url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/${userId}`,
				headers: { Authorization: `Bearer ${token}` },
				data: {
					name: resultData.userName,
					nickname: resultData.nickname,
					phoneNumber: resultData.phoneNumber,
					address: resultData.address,
					profileImg: profileImg,
				},
			});
			alert('정보가 변경되었습니다.');
			navigate('/mypage');
		} catch (err) {
			alert(err.stack);
		}
	};

	//DaumPostcode
	const handleComplete = data => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		setAddress(fullAddress);
	};

	const postCodeStyle = {
		display: 'block',
		position: 'absolute',
		top: '50%',
		width: '30vw',
		height: '30vh',
		padding: '7px',
		left: '30%',
		zIndex: 100,
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
					<SignupHeader>회원 정보 수정</SignupHeader>
					<form>
						<SignupInput
							name="name"
							value={userName || ''}
							onChange={e => {
								setUserName(e.target.value);
							}}
							placeholder="이름을 입력해 주세요."
						/>
						<SignupInput
							name="nickname"
							value={userNickname || ''}
							onChange={e => {
								setUserNickname(e.target.value);
							}}
							placeholder="닉네임을 입력해 주세요."
						/>
						<SignupInput
							name="phonenumber"
							value={phoneNumber || ''}
							placeholder="휴대폰 번호를 입력해 주세요."
							onChange={e => {
								setPhoneNumber(e.target.value);
							}}
						/>
						<SignupInput
							name="address"
							defaultValue={address}
							placeholder="주소를 입력해 주세요."
							style={{ width: '17rem' }}
						/>
						<AddressButton
							onClick={e => {
								e.preventDefault();
								setPopup(!popup);
							}}
						>
							주소 찾기
							{!popup && (
								<DaumPostcodeEmbed style={postCodeStyle} onComplete={handleComplete} autoClose />
							)}
						</AddressButton>
						<SignupInput
							type="text"
							value={address2}
							name="address2"
							onChange={e => {
								setAddress2(e.target.value);
							}}
							placeholder="상세 주소를 입력해 주세요."
							style={{ top: '3.5rem' }}
						/>

						<SignupInput
							type="file"
							name="profileImage"
							onChange={e => {
								const file = e.target.files[0];
								setProfileImage(file);
							}}
							style={{ top: '3.5rem' }}
						/>

						<SignupButton onClick={handleSubmit}>변경</SignupButton>
					</form>
				</SignupContainer>
			</SignupSection>
		</>
	);
}

export default EditProfile;
