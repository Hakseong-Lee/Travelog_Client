import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import EditModal from './EditModal';
import { useRecoilState } from 'recoil';
import { listNumberState } from '../../../recoil/Atom';

function EditBookmark(props) {
	const [listNumber, setListNumber] = useRecoilState(listNumberState);
	const [select, setSelect] = useState([]);
	const [isClose, setIsClose] = useState(false);
	function editFolder() {
		setIsClose(!isClose);
		setListNumber(props.i);
		select.includes(listNumber)
			? setSelect(select.filter(button => button !== listNumber))
			: setSelect(select => [...select, listNumber]);
	}
	return (
		<EditBtnStyle>
			<BsThreeDots className="editBtn" i={props.i} onClick={editFolder} />
			{listNumber === props.i && isClose ? <EditModal setIsClose={setIsClose} i={props.i} /> : null}
		</EditBtnStyle>
	);
}

const EditBtnStyle = styled.div`
	.editBtn {
		position: absolute;
		right: 3rem;
		cursor: pointer;
		opacity: 0.5;
	}
	.editBtn:hover {
		opacity: 1;
	}
`;

export default EditBookmark;
