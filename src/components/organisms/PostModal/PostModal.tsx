import React, {useEffect, useState} from 'react';
import * as S from './PostModal.style';
import {useAtom} from 'jotai';
import {isPostModalOpenAtom} from '../../../stores/postModalOpen';
import {IoIosCloseCircle} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {addDataToServer} from '../../../businesslogics/addToServer';
import {postsAtom} from '../../../stores/post';
import {PostType} from '../../../type/post';

export const PostModal = () => {
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [link, setLink] = useState('');
	const [tags, setTags] = useState(['Tag1', 'Tag2', 'Tag3']);
	const [selectedTag, setSelectedTag] = useState('');
	const [data, setData] = useAtom(postsAtom);
	const [id, setId] = useState(data.length);

	useEffect(() => {
		setId(id + 1);
	}, []);
	const addTag = () => {
		const newTag = `Tag${tags.length + 1}`;
		setTags([...tags, newTag]);
	};

	const handleLinkChange = (e: any) => {
		setLink(e.target.value);
	};

	const handleTagChange = (e: any) => {
		setSelectedTag(e.target.value);
	};

	const handleClear = () => {
		setLink('');
	};

	const handleSubmit = (data: PostType) => {
		addDataToServer(data)
			.then(newData => {
				setData(prevData => [...prevData, newData]);
				setIsModalOpen(false);
			})
			.catch(error => console.error('Error adding data:', error));
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<S.PostModalBackground>
			<S.PostModalWrapper>
				<S.LinkInputWrapper>
					<S.TitleWrapper>
						<S.Title>복사된 링크</S.Title>
					</S.TitleWrapper>
					<S.LinkInputContainer>
						<S.LinkInput type='text' value={link} onChange={handleLinkChange} placeholder='복사한 URL을 붙여주세요.' />
						<IoIosCloseCircle
							onClick={() => {
								handleClear();
							}}
						/>
					</S.LinkInputContainer>
				</S.LinkInputWrapper>
				<S.TagWrapper>
					<S.TitleWrapper>
						<S.Title>태그 선택</S.Title>
						<AiFillPlusCircle
							onClick={() => {
								addTag();
							}}
						/>
						{/*	TODO: 태그 추가 기능*/}
					</S.TitleWrapper>
					<S.TagContainer>
						{/*TODO: Tag 중 하나를 꾹 누르면 태그명 변경할 수 있는 기능*/}
						{tags.map((tag, index) => (
							<S.Tag key={index}>
								<input type='radio' name='tag' value={tag} onChange={handleTagChange} checked={selectedTag === tag} /> {tag}
							</S.Tag>
						))}
					</S.TagContainer>
				</S.TagWrapper>
				<S.ButtonWrapper>
					<S.Button onClick={handleCancel}>취소</S.Button>
					<S.Button
						onClick={() => {
							// TODO: 링크 유효성 검사, 태그 선택 여부 확인
							handleSubmit({id: id, link: link, tag: selectedTag});
						}}
					>
						확인
					</S.Button>
				</S.ButtonWrapper>
			</S.PostModalWrapper>
		</S.PostModalBackground>
	);
};
