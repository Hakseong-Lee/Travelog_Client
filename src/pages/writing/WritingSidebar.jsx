import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TbStar } from 'react-icons/tb';
import WritingList from './WritingList';
import { useRecoilState } from 'recoil';
import { ImSearch } from 'react-icons/im';
import { toggleState, boardState, checkedState } from '../../recoil/Atom.jsx';
import axios from 'axios';
import { useLocation } from 'react-router';

const SidebarTitleBox = styled.div`
	margin: 1rem;
	background-color: #fff;
	padding: 0.5rem;
	border-radius: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
`;
const SearchbarBox = styled.div`
	background-color: #fff;
	margin: 2rem 1rem 1rem 1rem;
	padding: 0.5rem;
	border-radius: 12px;
`;

const SearchButton = styled.button`
	border: 0;
	outline: 0;
	padding: 0.5rem;
	background-color: #fff;
`;
const SearchInput = styled.input`
	border: 0;
	outline: 0;
`;
const SearchForm = styled.form`
	display: grid;
	grid-template-columns: 3fr 1fr;
`;
const FavoriteBox = styled.div`
	.icon {
		width: 3rem;
		height: 3rem;
		padding: 0.5rem;
		background-color: #ffb877;
		color: white;
		border-radius: 5px;
	}
`;
const SidebarHeader = styled.h1`
	font-size: 1.8rem;
	text-align: center;
`;

const WritingsidebarContainer = styled.div`
	width: 30rem;
	height: calc(100vh - 5rem);
	background-color: #fafafa;
	box-shadow: 0 40px 22px 2px rgba(0, 0, 0, 0.25);
	overflow: scroll;
	position: fixed;
`;
const SidebarListBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin: 1rem;
	padding: 1rem;
	background-color: #fff;
	border-radius: 5px;
`;

const ListFilterBox = styled.div`
	margin: 1rem;
	padding: 0.5rem 1rem 0.5rem 1rem;
	display: flex;
	justify-content: ${props => props.children[0].props.className};
	background-color: #fff;
	.display {
		display: block;
	}
	.displayNone {
		display: None;
	}
	.space-between {
		display: block;
	}
	.flex-end {
		display: None;
	}
`;
const EditBtn = styled.button`
	border: none;
	background-color: #fff;
	cursor: pointer;
`;
const Select = styled.select`
	border: none;
	background-color: #fff;
	cursor: pointer;
`;
const EditBox = styled.div`
  display flex;
`;
function WritingSidebar() {
	const location = useLocation(); // location.search 함수로 / 뒤의 주소 받아옴
	const queryArray = decodeURI(location.search).split('='); // 한글 url decode 해주고 = 기준으로 앞뒤로 자르기
	const params = queryArray[1]; // 뒤에 있는 걸 가져오면 내가 원하는 검색어

	const [list, setList] = useState([]);
	//axios bearer token
	const token = window.localStorage.getItem('token');
	let config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	//데이터 불러오기
	const getListData = async () => {
		try {
			await axios
				.get(
					`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/folder/${params}`,
					config,
				)
				.then(res => setList(res.data));
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getListData();
	}, []);
	const [selected, setSelected] = useState('최신');
	useEffect(() => {
		let newlist = [];
		switch (selected) {
			case '최신':
				newlist = [...list].sort((a, b) => a.id - b.id);
				setList(newlist);
				break;
			case '장소':
				newlist = [...list].sort(function (a, b) {
					return a.placeName < b.placeName ? -1 : a.placeName > b.placeName ? 1 : 0;
				});
				setList(newlist);
				break;
			case '메모':
				newlist = [...list].sort(function (a, b) {
					return a.bookmarkMemo < b.bookmarkMemo ? -1 : a.bookmarkMemo > b.bookmarkMemo ? 1 : 0;
				});
				setList(newlist);
				break;
		}
	}, [selected]);

	const handleChange = e => {
		setSelected(e.target.value);
	};
	// 리스트 편집 토글
	const [toggle, setToggle] = useRecoilState(toggleState);
	const clickedToggle = () => {
		setToggle(prev => !prev);
	};
	const [board, setBoard] = useRecoilState(boardState);
	// 리스트 체크박스 상태관리
	const [checkedInputs, setCheckedInputs] = useRecoilState(checkedState);
	function handleDel() {
		const newList = list.filter(e => {
			return !checkedInputs.includes(e.id);
		});
		const checkedList = board.filter(e => {
			return !checkedInputs.includes(e.id);
		});
		setList(newList);
		setBoard(checkedList);
		setToggle(false);
	}
	const [inputValue, setInputValue] = useState('');
	const [filtering, setFiltering] = useState([]);
	const onChange = e => {
		setInputValue(e.target.value);
		const filterData = list.filter(i => i.placeName.includes(e.target.value));
		setFiltering(filterData);
	};
	const handleSubmit = e => {
		e.preventDefault();
		const filterData = list.filter(e => e.placeName.includes(inputValue));
		setFiltering(filterData);
	};
	let filteredList;
	if (inputValue) {
		filteredList = filtering.map(e => {
			return (
				<WritingList
					id={e.id}
					placeName={e.placeName}
					placeUrl={e.placeUrl}
					bookmarkMemo={e.bookmarkMemo}
					categoryGroupName={e.categoryGroupName}
				/>
			);
		});
	} else {
		filteredList = list.map(e => {
			return (
				<WritingList
					id={e.id}
					placeName={e.placeName}
					placeUrl={e.placeUrl}
					bookmarkMemo={e.bookmarkMemo}
					categoryGroupName={e.categoryGroupName}
				/>
			);
		});
	}
	return (
		<WritingsidebarContainer>
			<SearchbarBox>
				<SearchForm onSubmit={handleSubmit}>
					<SearchInput
						className="search"
						placeholder="Search"
						onChange={onChange}
						value={inputValue}
					/>
					<SearchButton type="submit" className="searchBtn">
						<ImSearch />
					</SearchButton>
				</SearchForm>
			</SearchbarBox>
			<SidebarTitleBox>
				<FavoriteBox>
					<TbStar className="icon" id="favoriteIcon" />
				</FavoriteBox>
				<SidebarHeader>{params}</SidebarHeader>
			</SidebarTitleBox>
			<ListFilterBox>
				<Select onChange={e => handleChange(e)} className={!toggle ? 'space-between' : 'flex-end'}>
					<option value={'최신'}>최신순</option>
					<option value={'장소'}>장소명순</option>
					<option value={'메모'}>메모순</option>
				</Select>
				<EditBox>
					<EditBtn
						className={toggle ? 'display' : 'displayNone'}
						onClick={handleDel}
						style={{ color: 'red' }}
					>
						삭제
					</EditBtn>
					<EditBtn className="editBtn" onClick={clickedToggle} toggle={toggle}>
						{!toggle ? '편집' : '취소'}
					</EditBtn>
				</EditBox>
			</ListFilterBox>
			<SidebarListBox>{list.length ? filteredList : <p>리스트가 비었습니다.</p>}</SidebarListBox>
		</WritingsidebarContainer>
	);
}

export default WritingSidebar;
