export class Attachment {
	private jsonString: string;

	constructor(name: string, contentType: string, data: string) {
		this.jsonString = `{"name": ${name}, "content_type": ${contentType}, "data": ${data}}`;
	}

	toString() {
		return this.jsonString;
	}
}