import { QTestResource } from './QTestResource';
import {Property} from "./Property";
import {Link} from "./Link";

export class TestCase extends QTestResource {
    automationContent: string;
    testCaseVersionId: number;
    properties: Property[];
    links: Link[];
    private _projectId: number;

	constructor() {
		super();
	}

	get projectId() {
		return this._projectId;
	}

	set projectId(id) {
		this._projectId = id;
		this._refreshURL();
	}

	toJSON() {
		return {
			links: this.links,
			id: this.id,
			name: this.name,
			automation_content: this.automationContent,
		};
	}

	static fromJSON(json: any) {
        Object.create(TestCase, json);
	}

	_refreshURL() {
		this.createURL = `/api/v3/projects/${this.projectId}/test-cases/`;
		this.updateURL = `/api/v3/projects/${this.projectId}/test-cases/${this.id}`;
	}

}