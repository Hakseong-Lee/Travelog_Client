export default function makeBookmark(bookmark, text, bmList, listNumber) {
	let newBookmark = JSON.parse(JSON.stringify(bookmark));
	let newObj = newBookmark.map(element => {
		let newObj = {
			bookmarkMemo: element.bookmarkMemo !== '' ? element.bookmarkMemo : '',
			placeName: element.place_name,
			placeUrl: element.place_url,
			categoryName: element.category_name,
			addressName: element.address_name,
			roadAddressName: element.road_address_name,
			bookmarkId: element.id,
			phone: element.phone,
			categoryGroupCode: element.category_group_code,
			categoryGroupName: element.category_group_name,
			x: element.x,
			y: element.y,
		};
		return newObj;
	});
	let textArray = Object.values(text);
	let textKey = Object.keys(text);
	textKey.map(key => (newObj[key].bookmarkMemo = textArray[key]));

	let newArray = {
		bookmarkName: bmList[listNumber],
		data: newObj,
	};
	return newArray;
}
