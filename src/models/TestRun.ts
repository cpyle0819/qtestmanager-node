import { QTestResource } from './QTestResource';
import { TestCase } from './TestCase';
import { Property } from './Property';

export class TestRun extends QTestResource {
    testCase: TestCase;
    testCaseId: number;
    properties: Property[];
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
		return {
			links: this.links,
			id: this.id,
			name: this.name,
			properties: this.properties,
			test_case: this.testCase
		};
	}

	static fromJSON(json: any) {
	    let tr = new TestRun();
	    tr.properties = json.properties;
	    tr.testCaseVersionId = json.test_case_version_id;
	    tr.links = json.links;
	    tr.id = json.id;
        return tr;
	}

	_refreshURL() {
		this.createURL = `/api/v3/projects/${this.projectId}/test-runs/`;
	}

}

