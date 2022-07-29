import React, { useState, useEffect } from 'react';
import SearchbarIntro from '../../components/SearchbarIntro';
import PostBox from '../../components/PostBox';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../recoil/Atom';
import CommunityModal from '../../components/CommunityModal';
import axios from 'axios';

function Qna() {
	const [inputValue, setInputValue] = useState('');
	const [qna, setQna] = useState([]);
	const postClick = useRecoilValue(communityState);
	useEffect(() => {
		(async () => {
			try {
				const type = 'qna';
				const data = await axios.get(
					`http://kdt-sw2-busan-team01.elicecoding.com:5000/api/posts/${type}`,
				);
				setQna(data.data);
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
		<div>
			<SearchbarIntro
				title=""
				containerWidth="45rem"
				containerHeight="5rem"
				inputWidth="25rem"
				titlePadding="0"
				inputLeft="4rem"
				inputTop="1.5rem"
				searchTop="1.8rem"
				visibleOption="visible"
				clickurl="qna"
				value={inputValue}
				changeMethod={handleChange}
				clickMethod={handleClick}
			/>
			{qna
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
					id={qna.find(i => i.id === postClick.id).id}
					title={qna.find(i => i.id === postClick.id).title}
					name={qna.find(i => i.id === postClick.id).User.nickname}
					img={qna.find(i => i.id === postClick.id).User.profileImg}
					content={qna.find(i => i.id === postClick.id).content}
					userId={qna.find(i => i.id === postClick.id).userId}
				/>
			)}
		</div>
	);
}

export default Qna;
