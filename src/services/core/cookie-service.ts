class CookieService {
	setValue(name: string, value: string, options: any) {
		let cookieString = `${name}=${value}`;
		if (options) {
			if (options.expires) {
				cookieString += `; expires=${options.expires}`;
			}
			if (options.path) {
				cookieString += `; path=${options.path}`;
			}
			if (options.domain) {
				cookieString += `; domain=${options.domain}`;
			}
			if (options.secure) {
				cookieString += `; secure`;
			}
			if (options.sameSite) {
				cookieString += `; sameSite=${options.sameSite}`;
			}
		}
		document.cookie = cookieString;
	}

	getValue(name: any) {
		const cookieName = `${name}=`;
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			if (cookie.indexOf(cookieName) === 0) {
				return cookie.substring(cookieName.length);
			}
		}
		return null;
	}

	removeValue(name: any) {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}

	isItemAvailable(name: any) {
		return Boolean(this.getValue(name));
	}

	clearCookies() {
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			const equalsIndex = cookie.indexOf("=");
			const name = cookie.substring(0, equalsIndex);
			this.removeValue(name);
		}
	}
}

const cookieService = new CookieService();

Object.freeze(cookieService);

export default cookieService;
