import {atom} from 'jotai';
import {PostType} from '../type/post';

export const postsAtom = atom<PostType[]>([]);
