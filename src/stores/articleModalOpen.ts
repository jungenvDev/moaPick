import {atom} from 'jotai';

export const isPostModalOpenAtom = atom(false);

export const isDeleteModeAtom = atom(false);

export const isModifyModeAtom = atom(-1);

export const deletedPostAtom = atom<any[]>([]);
