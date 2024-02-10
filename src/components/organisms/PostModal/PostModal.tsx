import React, {useEffect, useRef, useState} from 'react';
import * as S from './PostModal.style';
import {useAtom} from 'jotai';
import {isPostModalOpenAtom} from '../../../stores/articleModalOpen';
import {IoIosCloseCircle} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {postsAtom} from '../../../stores/article';
import {urlRegex} from '../../../util/urlRegex';
import {useAddArticleToServer, useGetArticle} from '../../../queries/article';

export const PostModal = () => {
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [link, setLink] = useState('');
	const [tags, setTags] = useState(['Tag1', 'Tag2', 'Tag3']);
	const [selectedTag, setSelectedTag] = useState('');
	const [data, setData] = useAtom(postsAtom);
	const [errorMessage, setErrorMessage] = useState('');
	const linkInputRef = useRef<HTMLInputElement>(null);
	const {refetch} = useGetArticle();
	const {mutate: addDataMutation} = useAddArticleToServer();
	useEffect(() => {
		if (linkInputRef.current) {
			linkInputRef.current.focus();
		}
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

	const handleSubmit = (data: any) => {
		if (!link) {
			setErrorMessage('링크를 입력해주세요.');
			return;
		} else if (!urlRegex.test(link)) {
			setErrorMessage('링크 형식이 올바르지 않습니다.');
			return;
		}
		setErrorMessage('');
		addDataMutation(data, {
			onSuccess: newData => {
				setData(prevData => [...prevData, newData]);
				setIsModalOpen(false);
				refetch();
			},
			onError: error => {
				console.error('Error adding data:', error);
			},
		});
	};
	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleSubmit({title: '', link: link});
		}
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
						<S.LinkInput
							ref={linkInputRef}
							type='text'
							value={link}
							onChange={handleLinkChange}
							onKeyPress={handleKeyPress}
							placeholder='복사한 URL을 붙여주세요.'
						/>
						<IoIosCloseCircle
							onClick={() => {
								handleClear();
							}}
						/>
					</S.LinkInputContainer>
					{errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
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
								<input
									type='radio'
									name='tag'
									value={tag}
									onChange={handleTagChange}
									checked={selectedTag === tag}
								/>{' '}
								{tag}
							</S.Tag>
						))}
					</S.TagContainer>
				</S.TagWrapper>
				<S.ButtonWrapper>
					<S.Button onClick={handleCancel}>취소</S.Button>
					<S.Button
						onClick={() => {
							// TODO: 링크 유효성 검사, 태그 선택 여부 확인
							handleSubmit({title: '', link: link});
						}}
					>
						확인
					</S.Button>
				</S.ButtonWrapper>
			</S.PostModalWrapper>
		</S.PostModalBackground>
	);
};
