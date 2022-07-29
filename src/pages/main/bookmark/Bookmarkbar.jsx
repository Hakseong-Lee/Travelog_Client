import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import { IoMdAirplane } from 'react-icons/io';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bookmarkbarState, viewDetailState, loginState } from '../../../recoil/Atom';
import BookmarkList from './BookmarkList';
import BookmarkDetail from './BookmarkDetail';
import SetModalBtn from '../../../components/SetModalBtn';

function Bookmarkbar() {
	const [bmClose, setBmClose] = useRecoilState(bookmarkbarState);
	const [getNumber, setGetNumber] = useState('');
	const isLoggedIn = useRecoilValue(loginState);
	const viewDetail = useRecoilValue(viewDetailState);

	useEffect(() => {
		renderDetailPage();
	}, [viewDetail]);

	function renderDetailPage() {
		return viewDetail ? (
			<BookmarkList getNumber={getNumber} setGetNumber={setGetNumber} />
		) : (
			<BookmarkDetail getNumber={getNumber} setGetNumber={setGetNumber} />
		);
	}
	function handleBookmarkbar() {
		setBmClose(!bmClose);
	}

	return (
		<BookmarkbarStyle>
			<div className={bmClose ? 'bookmarkbar close' : 'bookmarkbar'}>
				<Searchbar />
				<SetModalBtn function={handleBookmarkbar} />
				<p className="myTravel">
					<IoMdAirplane /> 나의 여정
				</p>
				<div className="contents">
					{isLoggedIn ? (
						renderDetailPage()
					) : (
						<span className="pleaseLogin">로그인이 필요합니다.</span>
					)}
				</div>
			</div>
		</BookmarkbarStyle>
	);
}

const BookmarkbarStyle = styled.div`
	position: absolute;
	z-index: 6;
	border-right: 1px solid rgb(219, 219, 219);
	.bookmarkbar {
		display: flex;
		flex-flow: column;
		position: absolute;
		top: 0;
		left: 4rem;
		width: 25rem;
		height: 91.5vh;
		background-color: #fafafa;
		transition: 0.5s ease-in-out;
	}

	.myTravel {
		background-color: transparent;
	}

	p {
		font-size: 1rem;
		margin: 0 1rem;
		background-color: white;
		border-radius: 0.5rem;
		text-align: center;
	}

	.contents {
		height: 75vh;
		margin: 1rem;
	}

	.close {
		left: -29rem;
		transition: 0.5s ease-in-out;
	}

	.pleaseLogin {
		position: absolute;
		top: 50%;
		left: 30%;
	}
`;

export default Bookmarkbar;
