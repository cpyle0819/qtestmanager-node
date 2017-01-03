import { Requester } from './Requester';

export class Authenticator extends Requester {
    token: string;

	constructor(host) {
		super(host);
		this.header = {"name": "Authorization", "value": "Basic QXBpQ29uc3VtZXI6"};
		this.header = {"name": "Content-Type", "value": "application/x-www-form-urlencoded"};
	}

	login(username, password) {
		let form = Authenticator.stringify({
			grant_type: 'password',
			username: username,
			password: password
		});

		return this.driver.post('/oauth/token', form).then((response) => {
			this.token = `${response.data.token_type} ${response.data.access_token}`;
			return this.token;
		});
	}

	logout() {
		this.clearHeaders();
		this.header = {"name": "Authorization", "value": this.token};
		return this.driver.post('/oauth/revoke');
	}

}