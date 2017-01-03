import { Link } from './Link';

export class QTestResource {
    links: Link[];
    id: number;
    updateURL: string;
    name: string;
    private _createURL: string;

	get createURL() {
		if (this._createURL) {
			return this._createURL
		} else {
			throw new Error("URL for this resource is undefined. Are you sure you set all of the necessary properties?");
		}
	}

	set createURL(url) {
		this._createURL = url;
	}

	getLink(linkName) {
		for (let link of this.links) {
			if (link.rel == linkName) {
				return link.href;
			}
		}
	}

	

}