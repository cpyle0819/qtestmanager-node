import { Requester } from './Requester';

export class Saver extends Requester {

	constructor(host, token) {
		super(host);
		this.header = {"name": "Authorization", "value": token};
		this.header = {"name": "Content-Type", "value": "application/json"};
		this.header = {"name": "Accept", "value": "application/json"};
	}

	saveNew(resource) {
		return this.driver.post(resource.createURL, resource.toJSON());
	}

	saveChanges(resource) {
		return this.driver.put(resource.updateURL, resource.toJSON());
	}
}