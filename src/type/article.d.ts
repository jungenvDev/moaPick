export interface ArticleType {
	id: number;
	title: string;
	link: string;
	tag: string;
}

export type SelectedTag = {
	index: number;
	name: string;
};
