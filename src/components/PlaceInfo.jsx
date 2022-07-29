import React, { useEffect } from 'react';
import styled from 'styled-components';
import handleStyle from '../function/handleStyle';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	placeInfoState,
	addBookmarkState,
	bookmarkState,
	activeState,
	detailInfoState,
} from '../recoil/Atom';
import { BsStarFill } from 'react-icons/bs';

function PlaceInfo() {
	const placeInfo = useRecoilValue(placeInfoState);
	const setActive = useSetRecoilState(activeState);
	const setDetailInfo = useSetRecoilState(detailInfoState);
	const [bookmark, setBookmark] = useRecoilState(bookmarkState);
	const setAddBookmark = useSetRecoilState(addBookmarkState);

	function handleBookmark(e) {
		setAddBookmark(true);
		const id = e.currentTarget.id;
		const targetObj = placeInfo[e.currentTarget.name];
		if (!bookmark.some(data => data.id == id)) {
			setBookmark([...bookmark, targetObj]);
		} else if (bookmark.some(data => data.id == id)) {
			setBookmark(bookmark.filter(data => data.id != id));
		}
	}

	function ActivateExtend(e) {
		setActive(true);
		setDetailInfo(placeInfo[e.currentTarget.id]);
	}

	function makePlaceInfo(placeInfo) {
		return placeInfo.map((data, i) => (
			<div key={Math.random()} id={data.id} name={i} className="infoBox">
				<div key={Math.random()}>{handleStyle(data)}</div>
				<button
					id={data.id}
					name={i}
					className={bookmark.includes(data) ? 'bookmarkBtn on' : 'bookmarkBtn'}
					onClick={handleBookmark}
				>
					<BsStarFill />
				</button>
				<ul id="placeInfoBox">
					<li onClick={ActivateExtend} id={i} className="placeInfoName">
						{data.place_name}
					</li>
					<li>{data.address_name}</li>
				</ul>
			</div>
		));
	}
	return <PlaceInfoStyle>{placeInfo == '' ? null : makePlaceInfo(placeInfo)}</PlaceInfoStyle>;
}
export default PlaceInfo;

const PlaceInfoStyle = styled.div`
	display: flex;
	flex-flow: column;
	width: 25rem;
	height: 80vh;
	justify-content: flex-start;
	font-size: 0.5rem;
	margin: auto;
	position: absolute;
	top: 5rem;

	overflow: scroll;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: #ccc;
	}

	.infoBox {
		width: 20rem;
		height: 8rem;
		background-color: white;
		border: 1px solid rgb(219, 219, 219);
		border-radius: 1rem;
		margin: 1rem auto;
		padding: 1rem;
		line-height: 2rem;
	}

	#placeInfoBox {
		width: 18rem;
	}

	.placeInfoIcon {
		width: 1.5rem;
		height: 1.5rem;
		float: left;
		padding: 0.5rem;
		margin: 1rem;
		border-radius: 0.25rem;
		color: white;
	}

	.placeInfoName {
		color: #5f6caf;
		cursor: pointer;
		font-size: 1rem;
	}

	.bookmarkBtn {
		float: right;
		font-size: 1.5rem;
		border: none;
		color: #ddd;
		background: transparent;
	}

	.bookmarkBtn:hover {
		float: right;
		font-size: 1.5rem;
		border: none;
		color: #ffb877;
		background: transparent;
		transition: all 0.5s ease-in-out;
	}

	.bookmarkBtn:active {
		float: right;
		font-size: 1.5rem;
		transform: scale(1.5);
		border: none;
		color: #ffb877;
		filter: brightness(1.2);
		background: transparent;
		transition: all 0.1s;
	}

	.on {
		color: #ffb877;
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
`;
