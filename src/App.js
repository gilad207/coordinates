import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
	const [ picture, setPicture ] = useState(undefined);
	const [ firstPick, setFirstPick ] = useState({ x: 0, y: 0 });
	const [ secondPick, setSecondPick ] = useState({ x: 0, y: 0 });
	const [ isTakingFirstCoord, setIsTakingFirstCoord ] = useState(false);
	const [ isTakingSecondCoord, setIsTakingSecondCoord ] = useState(false);

	const onDrop = (picture) => {
		setPicture(picture);
	};

	const handleSubmit = () => {
		setIsTakingFirstCoord(false);
		setIsTakingSecondCoord(false);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstPick, secondPick })
		};
		fetch('https://jsonplaceholder.typicode.com/posts', requestOptions);
	};

	const takeCoordinate = (event) => {
		if (isTakingFirstCoord) {
			setFirstPick({ x: event.clientX, y: event.clientY });
		} else if (isTakingSecondCoord) {
			setSecondPick({ x: event.clientX, y: event.clientY });
		}
	};

	return (
		<div>
			{picture == undefined && (
				<ImageUploader
					withIcon={true}
					buttonText="Choose image"
					onChange={onDrop}
					imgExtension={[ '.jpg', '.gif', '.png', '.gif' ]}
					maxFileSize={5242880}
					singleImage={true}
				/>
			)}
			{picture && (
				<img id="image" src={URL.createObjectURL(picture[0])} onClick={(event) => takeCoordinate(event)} />
			)}
			<div>
				<Submit
					onClick={() => {
						setIsTakingFirstCoord(true);
						setIsTakingSecondCoord(false);
					}}
				>
					Take first coordinate
				</Submit>
				<Coords>
					x: {firstPick.x}; y: {firstPick.y}
				</Coords>
			</div>
			<div>
				<Submit
					onClick={() => {
						setIsTakingSecondCoord(true);
						setIsTakingFirstCoord(false);
					}}
				>
					Take second coordinate
				</Submit>
				<Coords>
					x: {secondPick.x}; y: {secondPick.y}
				</Coords>
			</div>
			<div>
				<Submit onClick={() => handleSubmit()}>Submit</Submit>
			</div>
		</div>
	);
}

export default App;

const Coords = styled.span`
	margin-left: 10px;
	font-weight: bold;
`;

const Submit = styled.button`
	margin-top: 30px;
	margin-left: 20px;
	padding: 6px 23px;
	background: #4a89c1;
	border-radius: 30px;
	color: white;
	font-weight: 300;
	font-size: 14px;
	transition: all 0.2s ease-in;
	cursor: pointer;
	outline: none;
	border: none;
`;
