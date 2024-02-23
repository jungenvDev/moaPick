export const getCookie = (name: string) => {
	if (typeof document === 'undefined') {
		return null;
	}
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts[1].split(';').shift();
	} else {
		return null;
	}
};

export const setCookie = (name: string, value: any, days: number) => {
	if (typeof document !== 'undefined') {
		let expires = '';
		const domain = document.location.hostname.includes('moapick')
			? '.moapick.vercel.app'
			: document.location.hostname;
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = `; domain=${domain}; expires=` + date.toUTCString();
		} else {
			expires = `; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
		}
		document.cookie =
			name + '=' + encodeURIComponent(value || '') + expires + '; path=/';
	}
};
