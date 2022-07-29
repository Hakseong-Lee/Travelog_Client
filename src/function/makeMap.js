import overlayContents from './overlayContents';
const { kakao } = window;

export default function makeMap() {
	const container = document.getElementById('map');
	const defaultLatLng = new kakao.maps.LatLng(36.390884093020325, 127.40080871739734);
	const options = {
		center: defaultLatLng,
		level: 4,
	};
	const kakaoMap = new kakao.maps.Map(container, options);
	kakaoMap.setMaxLevel(12);

	const places = new kakao.maps.services.Places();

	places.keywordSearch('엘리스코딩', placesSearchCB);

	function placesSearchCB(data, status, pagination) {
		if (status === kakao.maps.services.Status.OK) {
			const imageSrc = 'https://elice.school/elice-logo-symbol.png',
				imageSize = new kakao.maps.Size(40, 40),
				imageOption = { offset: new kakao.maps.Point(27, 69) };

			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
			let bounds = new kakao.maps.LatLngBounds();
			for (let i = 0; i < data.length; i++) {
				let marker = new kakao.maps.Marker({
					map: kakaoMap,
					position: new kakao.maps.LatLng(data[i].y, data[i].x),
					image: markerImage,
				});
				let infowindow = new kakao.maps.InfoWindow({
					zIndex: 1,
					removable: true,
				});

				bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				kakao.maps.event.addListener(marker, 'click', function () {
					infowindow.setContent(overlayContents(data[i]));
					infowindow.open(kakaoMap, marker);
				});
				kakao.maps.event.addListener(kakaoMap, 'zoom_changed', function () {
					if (kakaoMap.getLevel() > 8) {
						infowindow.close();
						marker.setMap(null);
					}
				});
			}

			function overlayContents(place) {
				return `
          <img src='https://elice-redirect-manager.azurewebsites.net/_next/static/media/elice_banner.077d9964.png' 
          style='float:left; width: 5rem; height: 5rem; margin: 3rem 1rem 0 1rem;'/>
          <div class='customOverlay' style='display:flex; width: 10rem; flex-flow:column;'>
          </label>
              <div style='color: blue;'>${
								place.place_name ? place.place_name : '장소 이름이 없습니다.'
							}</div>
              <div>${place.address_name}</div>
              <div>${place.phone}</div>
              <a href=${
								place.place_url
							} target='_blank' style='color:#5f6caf;'>카카오 지도로 보기</a> 
          </div>`;
			}

			kakaoMap.setBounds(bounds);
		}
	}

	return kakaoMap;
}
