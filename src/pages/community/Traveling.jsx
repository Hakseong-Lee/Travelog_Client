import React, { useState, useEffect } from 'react';
import TravelPost from '../../components/TravelPost';
import axios from 'axios';

function Traveling() {
	const [travelData, setTravelData] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const type = 'post';
				const data = await axios.get(
					`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/${type}`,
				);
				setTravelData(data.data);
			} catch (e) {
				console.error(e);
			}
		})();
	});
	return (
		<div>
			{travelData.map((i, idx) => {
				return (
					<TravelPost
						key={idx}
						cateCity={i.cateCity}
						id={i.id}
						img={i.mainImg}
						markedData={i.markedData}
						tag={i.tag}
						username={i.User.nickname}
						profileImg={i.User.profileImg}
						title={i.title}
						userId={i.userId}
					/>
				);
			})}
		</div>
	);
}

export default Traveling;
