import {atom} from 'jotai';
import {PostType} from '../type/post';

export const isPostModalOpenAtom = atom(false);

export const isDeleteModeAtom = atom(false);
export const deletedPostAtom = atom<PostType[]>([]);
