export default function overlayContents(place) {
	return `
    <div class='customOverlay'>
        <div>${place.place_name ? place.place_name : '장소 이름이 없습니다.'}</div>
        <div>${place.address_name}</div>
        <div>${place.phone}</div>
        <a href=${place.place_url} target='_blank' style='color:#5f6caf;'>카카오 지도로 보기</a> 
    </div>`;
}
