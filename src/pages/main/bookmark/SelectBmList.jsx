import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bookmarkbarState, showBmListState, currentListState } from '../../../recoil/Atom';
import ModalBmList from './ModalBmList';

function SelectBmList() {
	const setBmClose = useSetRecoilState(bookmarkbarState);
	const setShowBmList = useSetRecoilState(showBmListState);
	const [currentList, setCurrentList] = useRecoilState(currentListState);

	function handleList() {
		setBmClose(false);
		setShowBmList(false);
	}

	return (
		<SelectBmListStyle>
			<span>추가할 리스트 선택</span>
			<div className="allbtnContainer">
				<ModalBmList currentList={currentList} setCurrentList={setCurrentList} />
			</div>
			<div className="addBmListContainer">
				<button className="addBmListBtn" onClick={handleList}>
					완료
				</button>
			</div>
		</SelectBmListStyle>
	);
}

const SelectBmListStyle = styled.div`
	position: absolute;
	z-index: 10;
	top: 60vh;
	left: 75vw;
	width: 15rem;
	padding: 1rem;
	padding-bottom: 2rem;
	background-color: white;
	border: 1px solid #ddd;

	span {
		font-weight: bold;
		padding: 0.5rem;
		color: #5f6caf;
	}

	.allbtnContainer {
		margin: 0.5rem;
	}
	.bmList {
		display: flex;
		width: 100%;
		flex-flow: column;
	}

	#btnStar {
		padding-right: 1rem;
	}

	.listBtn {
		display: flex;
		padding: 1rem;
		margin: 0.5rem 0;
		width: 12rem;
		font-size: 1rem;
		cursor: pointer;
		color: #555;
		border-bottom: 1px solid #fafafa;
		border-radius: 0.25rem;
		background-color: white;
		align-items: center;
	}

	.on {
		background-color: #edf7fa;
	}

	.addBmListBtn {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		border: none;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		color: #0385ff;
		background-color: transparent;
	}
`;

export default SelectBmList;
