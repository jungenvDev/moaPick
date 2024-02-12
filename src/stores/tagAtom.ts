import {atom} from 'jotai';
import {SelectedTag} from '../type/article';

export const selectedTagAtom = atom<SelectedTag[]>([]);
