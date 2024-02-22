import React, {useEffect, useRef, useState} from 'react';
import * as S from './PostModal.style';
import {useAtom} from 'jotai';
import {
	isModifyModeAtom,
	isPostModalOpenAtom,
} from '../../../stores/articleModalOpen';
import {IoIosCheckmarkCircle, IoIosCloseCircle} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {urlRegex} from '../../../util/urlRegex';
import {
	useAddArticleToServer,
	useGetAllArticle,
	useGetArticleById,
	useModifyArticle,
} from '../../../queries/article';
import {
	useAddTags,
	useAttachTag,
	useDeleteTag,
	useDetachTag,
	useGetAllTag,
} from '../../../queries/tag';
import {selectedTagAtom} from '../../../stores/tagAtom';
import {SelectedTag} from '../../../type/article';

export const PostModal = () => {
	const [isModifyMode] = useAtom(isModifyModeAtom);
	const {data: articleData} = useGetArticleById(isModifyMode);
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [link, setLink] = useState(articleData?.article_link || '');
	const [title, setTitle] = useState(articleData?.title || '');
	const [isTagModifyMode, setIsTagModifyMode] = useState(-1);
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
	const {mutate: modifyArticleMutation} = useModifyArticle();
	const {mutate: addTagMutation} = useAddTags();
	const {mutate: deleteTagMutation} = useDeleteTag();
	const {mutate: detachTagMutation} = useDetachTag();
	const {mutate: attachTagMutation} = useAttachTag();

	useEffect(() => {
		if (linkInputRef.current) {
			linkInputRef.current.focus();
		}
	}, []);

	//수정 모드 진입
	useEffect(() => {
		if (isModifyMode !== -1 && articleData?.tags && allTags) {
			// `articleData.tags`에 있는 각 태그에 대해 전체 태그 목록(`allTags`)에서 해당 태그의 인덱스를 찾습니다.
			const selectedTags = articleData.tags
				.map((tag: any) => {
					const index = allTags.findIndex(t => t.title === tag.title);
					return {index, name: tag.title};
				})
				.filter((tag: any) => tag.index !== -1); // allTags에서 찾을 수 있는 태그만을 포함합니다.

			setSelectedTag(selectedTags);
			setLink(articleData.article_link);
			setTitle(articleData.title);
		}
	}, [isModifyMode, articleData, allTags, setSelectedTag]);
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

	const handleLinkChange = (e: any) => {
		setLink(e.target.value);
	};

	const handleTitleChange = (e: any) => {
		if (e.target.value.length > 51) {
			setTitleErrorMessage('메모는 50자 이하로 입력해주세요.');
			return;
		} else setTitle(e.target.value);
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
	const handleModify = () => {
		if (!link) {
			setLinkErrorMessage('링크를 입력해주세요.');
			return;
		} else if (!urlRegex.test(link)) {
			setLinkErrorMessage('링크 형식이 올바르지 않습니다.');
			return;
		}

		setLinkErrorMessage('');
		articleData.tags?.map((tag: any) => {
			detachTagMutation({
				article_id: isModifyMode,
				tag_id: tag.id,
			});
		});

		if (selectedTag.length === 0) return;
		selectedTag?.forEach(selectedTag => {
			const tag = allTags?.find(tag => tag.title === selectedTag.name);

			if (tag) {
				attachTagMutation({
					article_id: allArticle?.[allArticle.length - 1].id,
					tag_id: tag.id,
				});
			}
		});
		modifyArticleMutation({
			id: isModifyMode,
			title: title === '' ? link : title,
			link: link,
		});
		setIsModalOpen(false);
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
							disabled={isModifyMode !== -1}
							ref={linkInputRef}
							type='text'
							value={link}
							onChange={handleLinkChange}
							onKeyPress={handleKeyPress}
							placeholder='복사한 URL을 붙여 넣어주세요.'
						/>
						{!isModifyMode && (
							<IoIosCloseCircle
								onClick={() => {
									handleLinkClear();
								}}
							/>
						)}
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
					</S.TitleWrapper>
					<S.TagContainer>
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
							<S.CheckBoxWrapper
								key={index}
								onMouseDown={() => handleLongTapStart(index)}
								onTouchStart={() => handleLongTapStart(index)}
								onTouchEnd={handleLongTapEnd}
								onMouseUp={handleLongTapEnd}
								onMouseLeave={handleLongTapEnd}
							>
								<S.Tag index={index} isTagModifyMode={isTagModifyMode}>
									<S.CheckboxInput
										type='checkbox'
										name='tag'
										value={tag}
										onChange={e => handleTagChange({index, name: tag}, e)}
										checked={
											selectedTag?.some(t => t.index === index) ||
											longTapIndex === index
										}
									/>{' '}
									{tag}
								</S.Tag>
								{/*<S.TagInputWrapper*/}
								{/*	isShowNewTagInput={index === isTagModifyMode}*/}
								{/*>*/}
								{/*	<S.ModifyTagInput*/}
								{/*		type='text'*/}
								{/*		value={tag}*/}
								{/*		onChange={e => {*/}
								{/*			const newTags = tags.slice();*/}
								{/*			newTags[index] = e.target.value;*/}
								{/*			setTags(newTags);*/}
								{/*		}}*/}
								{/*	/>*/}
								{/*	<IoIosCheckmarkCircle*/}
								{/*		onClick={() => {*/}
								{/*			// addTag();*/}
								{/*		}}*/}
								{/*	/>*/}
								{/*</S.TagInputWrapper>*/}
								{longTapIndex === index && (
									<S.TagButtonWrapper
										index={index}
										isTagModifyMode={isTagModifyMode}
									>
										{/*<S.ModifyTagButton*/}
										{/*	onClick={() => setIsTagModifyMode(index)}*/}
										{/*>*/}
										{/*	수정*/}
										{/*</S.ModifyTagButton>*/}
										<S.DeleteTagButton
											onClick={() => {
												deleteTagMutation(allTags?.[index].id);
												detachTagMutation({
													article_id: allArticle?.[allArticle?.length - 1].id,
													tag_id: allTags?.[index].id,
												});
												setLongTapIndex(null);
												setTags(tags.filter((_, i) => i !== index));
											}}
										>
											삭제
										</S.DeleteTagButton>
									</S.TagButtonWrapper>
								)}
							</S.CheckBoxWrapper>
						))}
					</S.TagContainer>
				</S.TagWrapper>
				<S.ButtonWrapper>
					<S.Button onClick={handleCancel}>취소</S.Button>
					<S.Button
						onClick={() => {
							isModifyMode !== -1
								? handleModify()
								: handleSubmit({
										title: title === '' ? link : title,
										link: link,
									});
						}}
					>
						확인
					</S.Button>
				</S.ButtonWrapper>
			</S.PostModalWrapper>
		</S.PostModalBackground>
	);
};
