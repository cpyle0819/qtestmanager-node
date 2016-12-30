import { QTestResource } from './QTestResource';
import { TestCase } from './TestCase';
import { Property } from './Property';

export class TestRun extends QTestResource {
    testCase: TestCase;
    properties: Property[];
    name: string;
    testCaseVersionId: number;
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
		let json = {
			links: this.links,
			id: this.id,
			name: this.name,
			properties: this.properties,
			test_case: this.testCase
		};
		return json;
	}

	static fromJSON(json: any) {
	    return Object.create(TestRun, json);
	}

	_refreshURL() {
		this.createURL = `/api/v3/projects/${this.projectId}/test-runs/`;
	}

}

