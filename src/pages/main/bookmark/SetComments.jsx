import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BsPencilFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { textState } from '../../../recoil/Atom';
function SetComments(props) {
	const [value, setValue] = useState('');
	const [text, setText] = useRecoilState(textState);

	const inputRef = useRef();
	const buttonRef = useRef();
	const pRef = useRef();

	function handleForm() {
		inputRef.current.type = 'display';
		buttonRef.current.style.display = 'block';
	}

	function handleBtn() {
		// input의 value 새로운 객체에 넣는 작업
		setText({ ...text, [props.i]: value });
		inputRef.current.type = 'hidden';
		buttonRef.current.style.display = 'none';
	}

	const handleChange = e => {
		setValue(e.target.value);
	};

	return (
		<SetCommentsStyle>
			<BsPencilFill className="addComments" onClick={handleForm} color="#5f6caf" />
			<div className="makeFlex">
				<input
					type="hidden"
					id={props.i}
					onChange={handleChange}
					ref={inputRef}
					value={props.comment}
					placeholder="메모를 등록해 주세요."
				/>
				<button onClick={handleBtn} ref={buttonRef}>
					등록
				</button>
				<p className="viewMemo" ref={pRef}>
					{text[props.i]}
				</p>
			</div>
		</SetCommentsStyle>
	);
}

export default SetComments;

const SetCommentsStyle = styled.div`
	button {
		float: right;
		display: none;
		color: white;
		background-color: #5f6caf;
		border: none;
		font-size: 0.75rem;
	}

	input {
		background-color: #edf7fa;
		margin-left: 0.1rem;
		height: 1.5rem;
	}

	input:focus {
		outline: none;
	}

	.viewMemo {
		width: 12rem;
		background-color: transparent;
		margin-top: 1rem;
	}

	.makeFlex {
		width: 4rem;
		height: 1.5rem;
	}

	.addComments {
		float: right;
		font-size: 1rem;
	}
`;
