import React, {useEffect, useRef, useState} from 'react';
import * as S from './PostModal.style';
import {useAtom} from 'jotai';
import {isPostModalOpenAtom} from '../../../stores/articleModalOpen';
import {IoIosCheckmarkCircle, IoIosCloseCircle} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {urlRegex} from '../../../util/urlRegex';
import {
	useAddArticleToServer,
	useGetAllArticle,
} from '../../../queries/article';
import {
	useAddTags,
	useDeleteTag,
	useDetachTag,
	useGetAllTag,
} from '../../../queries/tag';
import {selectedTagAtom} from '../../../stores/tagAtom';
import {SelectedTag} from '../../../type/article';

export const PostModal = () => {
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [link, setLink] = useState('');
	const [title, setTitle] = useState('');
	const {data: allTags} = useGetAllTag();
	const [tags, setTags] = useState(allTags?.map(tag => tag.title) || []);
	const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
	const [linkErrorMessage, setLinkErrorMessage] = useState('');
	const [titleErrorMessage, setTitleErrorMessage] = useState('');
	const [isShowNewTagInput, setIsShowNewTagInput] = useState(false);
	const [newTagName, setNewTagName] = useState('');
	const linkInputRef = useRef<HTMLInputElement>(null);
	const {data: allArticle, refetch: allArticleRefetch} = useGetAllArticle();

	const {mutate: addArticleMutation} = useAddArticleToServer();
	const {mutate: addTagMutation} = useAddTags();
	const {mutate: deleteTagMutation} = useDeleteTag();
	const {mutate: detachTagMutation} = useDetachTag();

	useEffect(() => {
		if (linkInputRef.current) {
			linkInputRef.current.focus();
		}
	}, []);

	const [longTapIndex, setLongTapIndex] = useState<number | null>(null);
	const longTapTimeoutRef = useRef<number | null>(null);

	const handleLongTapStart = (index: number) => {
		// setTimeout 호출 시 반환되는 타이머 ID를 useRef에 저장
		longTapTimeoutRef.current = window.setTimeout(() => {
			// 브라우저 환경에서는 `window.`를 명시적으로 사용할 수 있습니다.
			setLongTapIndex(index);
		}, 500);
	};

	const handleLongTapEnd = () => {
		// clearTimeout에 타이머 ID를 전달하여 타이머를 취소
		if (longTapTimeoutRef.current !== null) {
			clearTimeout(longTapTimeoutRef.current);
			longTapTimeoutRef.current = null;
		}
	};
	//TODO: 태그 추가 버튼 누르면 태그 화면 최상단으로 이동
	//TODO: 동일한 태그네임 입력시 alert
	const setNewTag = () => {
		setIsShowNewTagInput(true);
	};

	const addTag = () => {
		if (newTagName === '') alert('태그 이름을 입력해주세요.');
		else {
			addTagMutation({title: newTagName});
			setIsShowNewTagInput(false);
			setTags([...tags, newTagName]);
			setNewTagName('');
		}
	};
	console.log('=>(PostModal.tsx:264) title.length', title.length);

	const handleLinkChange = (e: any) => {
		setLink(e.target.value);
	};

	const handleTitleChange = (e: any) => {
		if (e.target.value.length > 51) {
			setTitleErrorMessage('메모는 50자 이하로 입력해주세요.');
			return;
		}

		if (e.target.value === '') setTitle(link);
		else setTitle(e.target.value);
	};

	const handleTagChange = (
		tag: SelectedTag,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			// 태그를 selectedTags에 추가합니다.
			setSelectedTag([...selectedTag, tag]);
		} else {
			// 태그를 selectedTags에서 제거합니다.
			setSelectedTag(selectedTag.filter(t => t.index !== tag.index));
		}
	};

	const handleLinkClear = () => {
		setLink('');
	};

	const handleTitleClear = () => {
		setTitle('');
	};

	const handleSubmit = (data: any) => {
		if (!link) {
			setLinkErrorMessage('링크를 입력해주세요.');
			return;
		} else if (!urlRegex.test(link)) {
			setLinkErrorMessage('링크 형식이 올바르지 않습니다.');
			return;
		}

		setLinkErrorMessage('');
		addArticleMutation(data);
		setIsModalOpen(false);
	};
	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleSubmit({title: link, link: link});
		}
	};
	const handleCancel = () => {
		setSelectedTag([]);
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
							placeholder='복사한 URL을 붙여 넣어주세요.'
						/>
						<IoIosCloseCircle
							onClick={() => {
								handleLinkClear();
							}}
						/>
					</S.LinkInputContainer>
					{linkErrorMessage && (
						<S.ErrorMessage>{linkErrorMessage}</S.ErrorMessage>
					)}
				</S.LinkInputWrapper>
				<S.LinkInputWrapper>
					<S.TitleWrapper>
						<S.Title>메모</S.Title>
					</S.TitleWrapper>
					<S.LinkInputContainer>
						<S.LinkInput
							type='text'
							value={title}
							onChange={handleTitleChange}
							onKeyPress={handleKeyPress}
							placeholder='메모를 적어주세요.'
						/>
						<IoIosCloseCircle
							onClick={() => {
								handleTitleClear();
							}}
						/>
					</S.LinkInputContainer>
					{titleErrorMessage && (
						<S.ErrorMessage>{titleErrorMessage}</S.ErrorMessage>
					)}
				</S.LinkInputWrapper>
				<S.TagWrapper>
					<S.TitleWrapper>
						<S.Title>태그 선택</S.Title>
						<AiFillPlusCircle
							onClick={() => {
								setNewTag();
							}}
						/>
						{/*	TODO: 태그 추가 기능*/}
					</S.TitleWrapper>
					<S.TagContainer>
						{/*TODO: Tag 중 하나를 꾹 누르면 태그명 변경할 수 있는 기능*/}
						<S.TagInputWrapper isShowNewTagInput={isShowNewTagInput}>
							<S.TagInput
								type='text'
								placeholder='새로운 태그 이름을 입력해주세요.'
								value={newTagName}
								onChange={e => setNewTagName(e.target.value)}
							/>
							<IoIosCheckmarkCircle
								onClick={() => {
									addTag();
								}}
							/>
						</S.TagInputWrapper>
						{tags.map((tag, index) => (
							<S.RadioWrapper
								key={index}
								onMouseDown={() => handleLongTapStart(index)}
								onMouseUp={handleLongTapEnd}
								onMouseLeave={handleLongTapEnd}
							>
								<S.Tag>
									<S.RadioInput
										type='checkbox'
										name='tag'
										value={tag}
										onChange={e => handleTagChange({index, name: tag}, e)}
										checked={
											selectedTag.some(t => t.index === index) ||
											longTapIndex === index
										}
									/>{' '}
									{tag}
								</S.Tag>
								{longTapIndex === index && (
									<>
										<S.ModifyTagButton>수정</S.ModifyTagButton>
										<S.DeleteTagButton
											onClick={() => {
												deleteTagMutation(allTags?.[index].id);
												detachTagMutation({
													article_id: allArticle?.[allArticle.length - 1].id,
													tag_id: allTags?.[index].id,
												});
												setLongTapIndex(null);
												setTags(tags.filter((_, i) => i !== index));
											}}
										>
											삭제
										</S.DeleteTagButton>
									</>
								)}
							</S.RadioWrapper>
						))}
					</S.TagContainer>
				</S.TagWrapper>
				<S.ButtonWrapper>
					<S.Button onClick={handleCancel}>취소</S.Button>
					<S.Button
						onClick={() => {
							// TODO: 링크 유효성 검사, 태그 선택 여부 확인
							handleSubmit({title: title, link: link});
						}}
					>
						확인
					</S.Button>
				</S.ButtonWrapper>
			</S.PostModalWrapper>
		</S.PostModalBackground>
	);
};
