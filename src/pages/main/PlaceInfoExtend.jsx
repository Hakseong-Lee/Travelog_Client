import React from 'react';
import styled from 'styled-components';
import handleStyle from '../../function/handleStyle';
import { TiArrowLeft } from 'react-icons/ti';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeState, detailInfoState, placeInfoState } from '../../recoil/Atom';

function PlaceInfoExtend() {
	const [active, setActive] = useRecoilState(activeState);
	const [detailInfo] = useRecoilState(detailInfoState);

	function handleExtendInfo() {
		setActive(false);
	}

	return (
		<PlaceInfoExtendbar>
			<div className={active ? 'placeInfoExtend' : 'placeInfoExtend close'}>
				<div className="detailInfo">
					<div className="detailIcon" key={Math.random()}>
						{handleStyle(detailInfo)}
					</div>
					<div id="x" onClick={handleExtendInfo}>
						<TiArrowLeft color="rgb(219,219,219)" />
					</div>
					<h1>{detailInfo.place_name}</h1>
					<h3>{detailInfo.category_group_name}</h3>
					<h2>
						{detailInfo.road_address_name === ''
							? detailInfo.address_name
							: detailInfo.road_address_name}
					</h2>
					<p>{detailInfo.phone}</p>
					<div className="placeUrl">
						<a href={detailInfo.place_url} target="_blank">
							카카오 지도에서 보기
						</a>
					</div>
				</div>
				<div className="travelog"></div>
			</div>
		</PlaceInfoExtendbar>
	);
}

const PlaceInfoExtendbar = styled.div`
	position: absolute;
	z-index: 5;
	font-size: 1rem;
	.placeInfoExtend {
		display: flex;
		flex-flow: column;
		position: absolute;
		transition: 0.5s ease-in-out;
		top: 0;
		left: 29rem;
		width: 20rem;
		height: 90vh;
		line-height: 3rem;
		overflow: scroll;
		background-color: #fafafa;
		overflow: scroll;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 8px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 2px;
			background: #ccc;
		}
	}

	.detailIcon {
		display: inline-block;
		padding-left: 27.2%;
		text-align: center;
		margin-top: 1rem;
		transform: scale(2.5);
		border-radius: 0.25rem;
		color: white;
	}

	.detailInfo {
		background-color: white;
		height: 20rem;
		margin: 1rem;
		border-radius: 0.5rem;
		border: 1px solid rgb(219, 219, 219);
	}

	.close {
		cursor: pointer;
		left: -40rem;
		flex-flow: column;
		transition: 0.5s ease-in-out;
	}

	#x {
		float: right;
		font-size: 1.5rem;
	}

	h1 {
		font-size: 1.2rem;
		color: #5f6caf;
		text-align: center;
	}

	h2 {
		text-align: center;
		font-size: 0.8rem;
	}

	h3 {
		font-size: 0.5rem;
		text-align: center;
		color: #999;
	}

	p {
		font-size: 1rem;
		text-align: center;
	}

	.placeUrl {
		text-align: center;
	}

	a {
		color: #5f6caf;
		font-size: 1rem;
	}

	.travelog {
		height: 100%;
		background-color: white;
		margin: 1rem;
		border: 1px solid rgb(219, 219, 219);
	}
`;

export default PlaceInfoExtend;
