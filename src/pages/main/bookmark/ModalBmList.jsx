import React, { useState } from 'react';
import makeBookmark from '../../../function/makeBookmark';
import { MdStars } from 'react-icons/md';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
	bookmarkListState,
	bookmarkSetState,
	bookmarkState,
	listNumberState,
	textState,
	currentListState,
} from '../../../recoil/Atom';
function ModalBmList() {
	const bmList = useRecoilValue(bookmarkListState);
	const bookmark = useRecoilValue(bookmarkState);
	const text = useRecoilValue(textState);
	const [listNumber, setListNumber] = useRecoilState(listNumberState);
	const [bookmarkSet, setBookmarkSet] = useRecoilState(bookmarkSetState);
	const [currentList, setCurrentList] = useRecoilState(currentListState);

	useState(() => {}, [listNumber]);

	function handleListColor(e) {
		const id = e.target.id;
		setListNumber(e.target.id);

		let newArray = makeBookmark(bookmark, text, bmList, listNumber);

		setBookmarkSet(newArray);

		currentList.includes(id) ? setCurrentList('') : setCurrentList(id);
	}

	return (
		<>
			{bmList.map((data, i) => (
				<div
					key={Math.random()}
					id={i}
					className={currentList.includes(i.toString()) ? 'listBtn on' : 'listBtn'}
					onClick={handleListColor}
				>
					<MdStars color="#ffb877" id="btnStar" size="24" />
					{data}
				</div>
			))}
		</>
	);
}

export default ModalBmList;
