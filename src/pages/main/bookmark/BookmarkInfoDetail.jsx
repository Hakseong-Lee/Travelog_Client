import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import handleStyle from '../../../function/handleStyle';
import makeBookmark from '../../../function/makeBookmark';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bookmarkState, bookmarkListState, textState, listNumberState } from '../../../recoil/Atom';
import SetComments from './SetComments';

function BookmarkInfoDetail() {
	const bmList = useRecoilValue(bookmarkListState);
	const text = useRecoilValue(textState);
	const listNumber = useRecoilValue(listNumberState);
	const [bookmark, setBookmark] = useRecoilState(bookmarkState);
	const [comment, setComment] = useState();

	useEffect(() => {
		let newArray = makeBookmark(bookmark, text, bmList, listNumber);
	}, [bookmark, listNumber]);

	async function handleBookmark(e) {
		// 북마크에 장소 삭제
		const id = e.target.id;
		typeof e.target.name == 'number'
			? setBookmark(bookmark.filter(data => data.serverId !== e.target.name))
			: setBookmark(bookmark.filter(data => data.id !== id));

		const data = { id: e.target.name };
		// 서버에서 북마크 삭제
		const token = localStorage.getItem('token');
		await axios({
			method: 'delete',
			url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/folder/${bmList[listNumber]}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: data,
		})
			.then(res => {
				console.log(res.status);
				console.log(res.data);
			})
			.catch(err => console.log(err.toJSON()));
	}

	function makeBookmarkInfoDetail(bookmark) {
		return bookmark.map((data, i) => (
			<div key={Math.random()} id={data.id} className="bookmarkBox">
				<button id={data.id} name={data.serverId} className="deleteBtn" onClick={handleBookmark}>
					x
				</button>
				<div className="detailPageFlexBox">
					<div className="detailPageiconBox">{handleStyle(data)}</div>
					<div className="detaliPagecolumnFlex">
						<div className="detailPagePlaceName" style={{ color: '#5f6caf', cursor: 'pointer' }}>
							{data.place_name}
						</div>
						<SetComments
							className="detailPagePencil"
							i={i}
							comment={comment}
							setComment={setComment}
						/>
					</div>
				</div>
			</div>
		));
	}

	return <BookmarkInfoDetailStyle>{makeBookmarkInfoDetail(bookmark)}</BookmarkInfoDetailStyle>;
}
export default BookmarkInfoDetail;

const BookmarkInfoDetailStyle = styled.div`
	display: flex;
	flex-flow: column;
	width: 30rem;
	height: 67vh;
	justify-content: flex-start;
	font-size: 0.5rem;
	margin: auto;
	overflow: scroll;

	overflow-y: auto;
	overflow-x: none;
	&::-webkit-scrollbar {
		width: 4px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: #ccc;
	}

	.detailPagePlaceName{
		display: inline;
		height: 2rem;
		flex-basis: 2rem;
		width: 14rem;
	}
	}

	.detailPageFlexBox {
		display: flex;
		width: 19rem;
		height: 9rem;
	}

	.placeInfoIcon {
		width: 2rem;
		display: inline-block;
		height: 2rem;
		float: left;
		padding: 0.5rem;
		margin: 2.5rem 0 0 1rem;
		border-radius: 0.25rem;
		color: white;
	}

	.detaliPagecolumnFlex{
		display: flex;
		flex-flow:column;
	}

	.bookmarkBox {
		width: 20rem;
		height: 10rem;
		background-color: #fafafa;
		border: none;
		border-radius: 1rem;
		margin: 0.5rem 0;
		line-height: 1.5rem;
	}

	.deleteBtn {
		float: right;
		font-size: 1rem;
		border: none;
		background-color: transparent;
		color: #5f6caf;	
	}

	.detailPagePencil {
		padding: 0.5rem 0 0 1rem;
	}
`;
