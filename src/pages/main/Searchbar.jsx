import React from 'react';
import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	placeState,
	mainInputValueState,
	bookmarkbarState,
	extendbarState,
} from '../../recoil/Atom';

function Searchbar() {
	const [mainInputValue, setMainInputValue] = useRecoilState(mainInputValueState);
	const setBmClose = useSetRecoilState(bookmarkbarState);
	const setClose = useSetRecoilState(extendbarState);
	const setPlace = useSetRecoilState(placeState);

	const onChange = e => {
		setMainInputValue(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		setPlace(mainInputValue);
		setClose(false);
		setBmClose(true);
	};

	return (
		<SearchBarContainer>
			<form className="searchbar" onSubmit={handleSubmit}>
				<input
					className="searchPlace"
					placeholder="Search Place..."
					onChange={onChange}
					value={mainInputValue}
				/>
				<button type="submit" className="searchBtn">
					<ImSearch />
				</button>
			</form>
		</SearchBarContainer>
	);
}

const SearchBarContainer = styled.div`
	.searchbar {
		display: flex;
		justify-self: center;
		margin: 1rem 2rem;
		height: 2rem;
		width: 20rem;
		background-color: white;
		border: 1px solid rgb(219, 219, 219);
	}

	.searchPlace {
		padding-left: 0.5rem;
		border: none;
		flex-grow: 3;
	}

	.searchPlace:focus {
		outline: none;
	}

	.searchBtn {
		justify-self: end;
		margin-top: 2px;
		flex-grow: 1;
		flex-basis: 20px;
		transform: scale(1.5);
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
`;

export default Searchbar;
