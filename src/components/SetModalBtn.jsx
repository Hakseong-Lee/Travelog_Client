import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { activeState, extendbarState, bookmarkbarState } from '../recoil/Atom';

function SetModalBtn(props) {
	const [close, setClose] = useRecoilState(extendbarState);
	const [active, setActive] = useRecoilState(activeState);
	const [bmClose, setBmClose] = useRecoilState(bookmarkbarState);
	return (
		<SetModalBtnStyle>
			{!active ? (
				<button onClick={props.function} id="closeBtn">
					{close && bmClose ? <BiRightArrowAlt /> : <BiLeftArrowAlt />}
				</button>
			) : null}
		</SetModalBtnStyle>
	);
}

const SetModalBtnStyle = styled.div`
	position: absolute;
	z-index: 4;
	#closeBtn {
		width: 1rem;
		height: 2rem;
		border: none;
		position: absolute;
		top: 45vh;
		transform: scale(1.5);
		background-color: #fafafa;
		color: #5f6caf;
		opacity: 0.9;
		padding: 0;
		left: 25.2rem;
	}
`;

export default SetModalBtn;
