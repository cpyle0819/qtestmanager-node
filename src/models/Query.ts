export class Query {
    objectType: string;
    fields: string[];
    query: string;
    pageSize: number;
    page: number;


	constructor() {
		this.fields = ["*"];
	}

	get searchParams() {
	    let pageSize = this.pageSize ? `pageSize=${this.pageSize}` : "";
	    let page = this.page ? `page="${this.page}` : "";
		return `?${pageSize}&${page}`;
    }

	addField(fieldName) {
		if (this.fields[0] == "*") this.fields = [];
		this.fields.push(fieldName);
	}

	toJSON() {
		return {
			object_type: this.objectType,
			fields: this.fields,
			query: this.query
		}
	}
}