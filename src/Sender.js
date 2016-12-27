import { Requester } from './Requester';

export class Sender extends Requester {

	constructor(host, token) {
		super(host);
		this.header = {"name": "Authorization", "value": token};
		this.header = {"name": "Content-Type", "value": "application/json"};
		this.header = {"name": "Accept", "value": "application/json"};
	}

	submit(resource) {
		return this.driver.post(resource.endpoint, resource.json);
	}
}