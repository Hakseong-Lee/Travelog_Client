import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { bookmarkListState } from '../../../recoil/Atom';

function EditModal(props) {
	const [editValue, setEditValue] = useState('');
	const [isEditName, setIsEditName] = useState(false);
	const [bmList, setBmList] = useRecoilState(bookmarkListState);
	function changeListName() {
		setIsEditName(!isEditName);
	}

	function changeName() {
		let bmListArray = [...bmList];
		bmListArray[props.i] = editValue;
		setBmList(bmListArray);
		setIsEditName(true);
	}

	function deleteList() {
		let deleteListArray = [...bmList];
		let filterArray = deleteListArray.filter(list => list !== bmList[props.i]);
		setBmList(filterArray);
		props.setIsClose(false);
	}
	return (
		<EditModalStyle>
			<button className="editModalListBtn" onClick={changeListName}>
				수정하기
			</button>
			{isEditName && (
				<span style={{ display: 'flex' }}>
					<input
						className="editInput"
						value={editValue}
						onChange={e => setEditValue(e.target.value)}
					/>
					<button className="closeEditBtn" onClick={changeName}>
						확인
					</button>
				</span>
			)}
			<button className="editModalListBtn" onClick={deleteList}>
				삭제하기
			</button>
		</EditModalStyle>
	);
}

export default EditModal;

const EditModalStyle = styled.div`
	position: absolute;
	display: flex;
	flex-flow: column;
	justify-content: center;
	width: 8rem;
	height: 3rem;
	margin: 1.5rem;
	background-color: white;

	border-radius: 0.25rem;

	.editModalListBtn {
		padding: 0.5rem;
		font-size: 0.5rem;
		border: 1px solid #eee;
		background-color: #edf7fa;
		border: 1px solid rgb(219, 219, 219);
	}

	.editInput {
		width: 5rem;
		height: 1rem;
	}

	.closeEditBtn {
		border: none;
		background-color: #fafafa;
		height: 1rem;
		font-size: 0.25rem;
	}
`;
