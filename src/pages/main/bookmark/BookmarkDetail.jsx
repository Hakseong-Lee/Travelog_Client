import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import makeBookmark from '../../../function/makeBookmark';
import { MdArrowBackIos, MdStars } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	bookmarkState,
	bookmarkSetState,
	bookmarkListState,
	listNumberState,
	viewDetailState,
	textState,
	currentListState,
} from '../../../recoil/Atom';
import BookmarkInfoDetail from './BookmarkInfoDetail';

function BookmarkDetail(props) {
	const [bookmark, setBookmark] = useRecoilState(bookmarkState);
	const bmList = useRecoilValue(bookmarkListState);
	const listNumber = useRecoilValue(listNumberState);
	const [bookmarkSet, setBookmarkSet] = useRecoilState(bookmarkSetState);
	const [viewDetail, setViewDetail] = useRecoilState(viewDetailState);
	const [text, setText] = useRecoilState(textState);
	const currentList = useRecoilValue(currentListState);

	useEffect(() => {
		let newArray = makeBookmark(bookmark, text, bmList, listNumber);
		setBookmarkSet(newArray);
	}, [bookmark]);

	let navigate = useNavigate();

	useEffect(() => {}, [listNumber]);

	async function sendToWriting() {
		const token = localStorage.getItem('token');
		await axios({
			method: 'post',
			url: 'http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/registers',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: bookmarkSet,
		})
			.then(res => {
				console.log(res.status);
				console.log(res.data);
			})
			.catch(err => console.log(err.toJSON()));
		navigate(`../writing?list=${bmList[listNumber]}`);
	}

	return (
		<DetailPageStyle>
			<div className="folder">
				<MdStars color="#ffb877" id="btnStar" size="32" />
				<p className="detailPageTitleName">{bmList[props.getNumber]}</p>
				<MdArrowBackIos className="backBtn" onClick={() => setViewDetail(!viewDetail)} />
			</div>
			<div className="content">
				{currentList == props.getNumber && <BookmarkInfoDetail getNumber={props.getNumber} />}
			</div>
			<button className="redirectTowrite" onClick={sendToWriting}>
				글쓰기
			</button>
		</DetailPageStyle>
	);
}

const DetailPageStyle = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	margin: auto;

	.folder {
		display: flex;
		justify-content: center;
		height: 3rem;
		font-size: 1.2rem;
		text-align: center;
		background-color: white;
		border-radius: 0.5rem;
		border: 1px solid rgb(219, 219, 219);
	}
	.content {
		width: 23rem;
		height: 67vh;
		margin: 1rem 0;
		text-align: center;
		overflow: scroll;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: white;
		border-radius: 0.25rem;
		border: 1px solid rgb(219, 219, 219);
		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 2px;
			background: #ccc;
		}
	}

	#btnStar {
		padding: 0.5rem 1rem 0 1rem;
	}
	.backBtn {
		padding: 0.8rem 0 0 4rem;
		cursor: pointer;
	}

	.detailPageTitleName {
		background-color: transparent;
		align-self: center;
	}

	.bookmarkBox {
		margin-left: 1.3rem;
		font-size: 1rem;
		min-height: 10rem;
		border: 1px solid rgb(219, 219, 219);
	}

	.infoBox {
		width: 15rem;
		height: 8rem;
		font-size: 2rem;
		background-color: white;
		border: none;
		border-radius: 1rem;
		margin: 1rem auto;
		padding: 1rem;
		line-height: 2rem;
	}

	.redirectTowrite {
		height: 2rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #5f6caf;
		color: white;
	}
`;

export default BookmarkDetail;
