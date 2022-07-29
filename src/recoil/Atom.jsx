import { atom } from 'recoil';

// 장소 API 결과값 배열
export const placeState = atom({
	key: 'placeState',
	default: '',
});

// 간단한 place info
export const placeInfoState = atom({
	key: 'placeInfoState',
	default: '',
});

// detail info 창에 뿌릴 데이터
export const detailInfoState = atom({
	key: 'detailInfoState',
	default: '',
});

export const mainInputValueState = atom({
	key: 'mainInputValueState',
	default: '',
});

export const extendbarState = atom({
	key: 'extendbarState',
	default: true,
});

export const addBookmarkState = atom({
	key: 'addBookmarkState',
	default: true,
});

export const allBookmarkState = atom({
	key: 'allBookmarkState',
	default: null,
});

// bookmark에 저장될 data
export const bookmarkState = atom({
	key: 'bookmarkState',
	default: [],
});

export const bookmarkSetState = atom({
	key: 'bookmarkSetState',
	default: null,
});

export const bookmarkListState = atom({
	key: 'bookmarkListState',
	default: ['내 여행'],
});

export const bookmarkbarState = atom({
	key: 'bookmarkbarState',
	default: true,
});

export const showBmListState = atom({
	key: 'showBmListState',
	default: false,
});

export const listNumberState = atom({
	key: 'listNumberState',
	default: false,
});

export const currentListState = atom({
	key: 'currentListState',
	default: [],
});

export const textState = atom({
	key: 'textState',
	default: [],
});

// bookmark info창 controller
export const viewDetailState = atom({
	key: 'ViewDetailState',
	default: true,
});

// detail info창 활성화
export const activeState = atom({
	key: 'placeInfoActiveState',
	default: 'false',
});

export const loginState = atom({
	key: 'loginState',
	default: Boolean(localStorage.getItem('token')),
});

export const colorLogState = atom({
	key: 'colorLogState',
	default: false,
});
export const communityState = atom({
	key: 'communityState',
	default: { state: false, id: '' },
});
export const iconMenuState = atom({
	key: 'iconMenuState',
	default: false,
});

export const toggleState = atom({
	key: 'toggleState',
	default: false,
});

export const boardState = atom({
	key: 'boardState',
	default: [],
});

export const dataState = atom({
	key: 'dataState',
	default: [],
});

export const checkedState = atom({
	key: 'checkedState',
	default: [],
});

export const tagState = atom({
	key: 'tagState',
	default: [],
});

export const cityTagToggleState = atom({
	key: 'cityTagToggleState',
	default: false,
});
