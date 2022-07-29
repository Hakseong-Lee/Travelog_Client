import React, { useState, useEffect } from 'react';
import SearchbarIntro from '../../components/SearchbarIntro';
import PostBox from '../../components/PostBox';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../recoil/Atom';
import CommunityModal from '../../components/CommunityModal';
import axios from 'axios';

function Companion() {
	const [inputValue, setInputValue] = useState('');
	const [together, setTogether] = useState([]);
	const postClick = useRecoilValue(communityState);
	useEffect(() => {
		(async () => {
			try {
				const type = 'together';
				const data = await axios.get(
					`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/${type}`,
				);
				setTogether(data.data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const handleChange = e => {
		setInputValue(e.target.value);
	};
	const handleClick = () => {};
	return (
		<>
			<SearchbarIntro
				title=""
				containerWidth="45rem"
				containerHeight="5rem"
				inputWidth="25rem"
				inputLeft="4rem"
				inputTop="0rem"
				searchTop="0.3rem"
				visibleOption="visible"
				clickurl="companion"
				value={inputValue}
				changeMethod={handleChange}
				clickMethod={handleClick}
			/>
			{together
				.filter(item => {
					if (inputValue === '') {
						return item;
					} else if (item.title.toLowerCase().includes(inputValue.toLowerCase())) {
						return item;
					}
				})
				.map((i, idx) => {
					return (
						<PostBox
							key={idx}
							title={i.title}
							img={i.User.profileImg}
							name={i.User.nickname}
							content={i.content}
							id={i.id}
						/>
					);
				})}
			{postClick.state && (
				<CommunityModal
					id={together.find(i => i.id === postClick.id).id}
					title={together.find(i => i.id === postClick.id).title}
					name={together.find(i => i.id === postClick.id).User.nickname}
					img={together.find(i => i.id === postClick.id).User.profileImg}
					content={together.find(i => i.id === postClick.id).content}
					userId={together.find(i => i.id === postClick.id).userId}
				/>
			)}
		</>
	);
}

export default Companion;
