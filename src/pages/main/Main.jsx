import React, { useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import Extendbar from './Extendbar.jsx';
import Bookmarkbar from './bookmark/Bookmarkbar.jsx';
import Map from '../../components/Map.jsx';
import SelectBmList from './bookmark/SelectBmList.jsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
	bookmarkListState,
	bookmarkSetState,
	allBookmarkState,
	detailInfoState,
	showBmListState,
} from '../../recoil/Atom';
import PlaceInfoExtend from './PlaceInfoExtend.jsx';

function Main() {
	const setBookmarkSet = useSetRecoilState(bookmarkSetState);
	const setBmList = useSetRecoilState(bookmarkListState);
	const setAllBookmark = useSetRecoilState(allBookmarkState);
	const showBmList = useRecoilValue(showBmListState);
	const detailInfo = useRecoilValue(detailInfoState);

	useEffect(() => {
		let bmArray = [];
		let bookmarkArray = [];
		let listResult = [];
		let decodeArray = [];

		// 북마크 정보 받아옴
		async function getInfomation() {
			const token = localStorage.getItem('token');
			await axios({
				method: 'get',
				url: 'http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/folders',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(res => {
					bmArray = res.data;
				})
				.catch(err => console.log(err));

			listResult = bmArray.map(data => data.bookmarkName); // 리스트 이름 배열로 변환
			for (let i = 0; i < bmArray.length; i++) {
				axios({
					method: 'get',
					url: `http://kdt-sw2-busan-team01.elicecoding.com:5000/api/bookmarks/folder/${listResult[i]}`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then(res => {
						bookmarkArray[i] = res.data;
					})
					.catch(err => console.log(err));
			}
		}

		getInfomation();

		setTimeout(() => {
			setBookmarkSet(bookmarkArray); // decoding 안된 데이터, 서버랑 연결할때 다시 씀.

			//decoding 함수
			for (let i = 0; i < bookmarkArray.length; i++) {
				decodeArray[i] = bookmarkArray[i].map(element => {
					let decodeArray = {
						bookmarkMemo: element.bookmarkMemo,
						place_name: element.placeName,
						place_url: element.placeUrl,
						category_name: element.categoryName,
						address_name: element.addressName,
						road_address_name: element.roadAddressName,
						id: element.bookmarkId,
						phone: element.phone,
						category_group_code: element.categoryGroupCode,
						category_group_name: element.categoryGroupName,
						x: element.x,
						y: element.y,
					};
					return decodeArray;
				});
			}
		}, 1000);

		setTimeout(() => {
			setBmList(listResult); // 폴더 정보
			setAllBookmark(decodeArray); // 인코딩된 모든 북마크 정보
		}, 2000);
	}, []);

	return (
		<>
			<Sidebar />
			<Map />
			{detailInfo == '' ? null : <PlaceInfoExtend />}
			<Extendbar />
			<Bookmarkbar />
			{showBmList && <SelectBmList setShowBmList={showBmList} />}
		</>
	);
}

export default Main;
