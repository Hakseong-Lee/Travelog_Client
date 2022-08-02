import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { colorLogState } from '../../recoil/Atom';
import ColorLogPageComponents from '../../components/ColorLogPageComponents';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
	const [usertext, setUserText] = useState('');
	const [userpost, setUserPost] = useState([]);
	const [userbookmark, setUserBookmark] = useState([]);
	const [userId, setUserId] = useState('');
	const [userprofile, setUserProfile] = useState('');
	const [editable, setEditable] = useState(false);
	const [buttonClick, setButtonClick] = useRecoilState(colorLogState);
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/user', config)
			.then(({ data }) => {
				setUserText(data.profileText);
				setUserProfile(data.profileImg);
				setUserId(data.id);
				setUserName(data.name);
			});
		axios
			.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/user', config)
			.then(({ data }) => setUserPost(data));
		axios
			.get('http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/folders', config)
			.then(({ data }) => setUserBookmark(data.length));
	}, []);

	const handleKeyDown = () => {
		axios({
			method: 'patch',
			url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/users/${userId}`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				profileText: usertext,
			},
		});
		setEditable(!editable);
	};
	//axios bearer token
	const token = window.localStorage.getItem('token');
	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const handleProfileText = () => {
		setEditable(!editable);
	};
	const handleButtonClick = () => {
		setButtonClick(true);
	};

	return (
		<Page>
			<Profile>
				<Img src={userprofile || '/img/default.png'} />
				<UserName>{userName}</UserName>

				{!editable ? (
					<>
						<ProfileInfoPara>{usertext} </ProfileInfoPara>
						<Pencil onClick={handleProfileText}></Pencil>
					</>
				) : (
					<>
						<InputBox
							type="text"
							value={usertext}
							onChange={e => {
								setUserText(e.target.value);
							}}
						/>
						<Pencil onClick={handleKeyDown} style={{ top: '-6.5rem', left: '20rem' }}></Pencil>
					</>
				)}

				<MyInfo>
					<MyInfoBox>
						<p>내 여행</p>
						<MyLog>{userbookmark}</MyLog>
					</MyInfoBox>
					<MyInfoBox>
						<p>여행글</p>
						<MyLog>{userpost.length}</MyLog>
					</MyInfoBox>
					<MyInfoBox onClick={handleButtonClick}>
						<p>컬러로그</p>
					</MyInfoBox>
				</MyInfo>
			</Profile>
			<PostMenu>
				<PostIcon src="img/posticon.png" />
				<Post>게시물</Post>
			</PostMenu>
			<Feed>
				{userpost.map(post => (
					<FeedBox key={post.id}>
						<FeedBtn onClick={() => navigate(`../view/${post.id}`)}>
							<FeedImg
								src={
									post.mainImg
										? post.mainImg
										: 'https://cdn.crowdpic.net/detail-thumb/thumb_d_3865635F24FB50FC7E5E781B7974F81E.jpg'
								}
							></FeedImg>
							<Title>{post.title}</Title>
						</FeedBtn>
					</FeedBox>
				))}
			</Feed>
			{buttonClick && <ColorLogPageComponents />}
		</Page>
	);
};
export default MyPage;

const FeedImg = styled.img`
	width: 17rem;
	height: 20rem;
	z-index: -9999;
	box-sizing: border-box;
	top: 0;
	left: 0;
	position: absolute;
`;
const FeedBtn = styled.button`
	width: 17rem;
	height: 20rem;
	border: 0;
	background-color:
	box-sizing: border-box;
	margin: auto;
	object-fit: fill;
	cursor: pointer;
	position: relative;
	background-color: transparent;
`;
const Title = styled.h2`
	font-size: 1.4rem;
	text-align: center;
	display: none;
`;
const FeedBox = styled.div`
	width: 17rem;
	height: 20rem;
	box-sizing: border-box;
	margin: auto;
	object-fit: fill;
	cursor: pointer;

	box-shadow: rgb(31 38 135 / 20%) 0px 8px 32px 0px;
	&:hover ${FeedImg} {
		filter: brightness(70%);
	}
	&:hover {
		transform: scale(1.1);
	}
	&:hover ${Title} {
		display: block;
		color: #fff;
	}
`;

const Page = styled.div`
	width: 60rem;
	margin: 3rem auto;
`;

const Profile = styled.div`
	width: 60rem;
	height: 23rem;
`;

const PostMenu = styled.div`
	border-top: 1px solid lightgrey;
	height: 3rem;
	display: flex;
	width: 60rem;
	justify-content: center;
`;

const PostIcon = styled.img`
	width: 1rem;
	display: flex;
	align-items: center;
	height: 1rem;
	padding-top: 1rem;
	margin-right: 0.5rem;
`;
const Post = styled.p`
	height: 3rem;
	display: flex;
	align-items: center;
	font-size: 0.5rem;
`;
const ProfileHeader = styled.div`
	display: flex;
	width: 60rem;
	justify-content: space-around;
`;
const ProfileImg = styled.div`
	display: flex;
	flex-direction: column;
	width: 40rem;
	align-items: center;
`;
const ProfileInfoPara = styled.p`
	width: 30rem;
	position: relative;
	top: -6rem;
	left: 22rem;
`;

const ProfileInfo = styled.section`
	display: flex;
	align-items: center;
	width: 50rem;
	justify-content: flex-start;
`;

const Img = styled.img`
	border-radius: 50%;
	width: 10rem;
	height: 10rem;
	position: relative;
	left: 7rem;
`;

const MyInfo = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 60rem;
`;
const MyInfoBox = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 14rem;
	height: 3rem;
	background-color: #edf7fa;
	align-items: center;
	line-height: 3rem;
	border-radius: 1rem;
	font-size: 1rem;
	cursor: pointer;
`;
const MyLog = styled.p`
	display: block;
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	text-align: center;
	line-height: 2rem;
	background-color: #fff;
`;
const UserName = styled.p`
	font-size: 1.8rem;
	position: relative;
	top: -8.5rem;
	left: 22rem;
`;

const Feed = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
	gap: 4rem 0;
	width: 60rem;
`;

const InputBox = styled.input`
	width: 18rem;
	height: 2.5rem;
	padding-left: 1rem;
	position: relative;
	top: -7rem;
	left: 22rem;
`;
const Pencil = styled(BiPencil)`
	position: relative;
	top: -13rem;
	left: 53rem;
	font-size: 1.5rem;
`;
