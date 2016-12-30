import { QTestResource } from './QTestResource';
import { Attachment } from './Attachment';
import { StepLog } from './StepLog';

export class AutomationTestLog extends QTestResource {
	status: string;
	executionStartDate: Date;
	executionEndDate: Date;
	automationContent: string;
	attachments: Attachment[];
	name: string;
    note: string;
    testCaseVersionId: number;
    testCaseId: number;
    testStepLogs: StepLog[];
    private _testRunId: number;
    private _projectId: number;

	constructor() {
		super();
	}

	get testRunId() {
		return this._testRunId;
	}

	set testRunId(id) {
		this._testRunId = id;
		this._refreshURL();
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
			exe_start_date: this.executionStartDate,
			exe_end_date: this.executionEndDate,
			attachments: this.attachments,
			status: this.status,
			name: this.name,
			automation_content: this.automationContent,
			note: this.note,
			test_step_logs: this.testStepLogs
		};
		return json;
	}

	fromJSON(json) {
		this.links = json.links;
		this.id = json.id;
		this.testCaseVersionId = json.test_case_version_id;
		this.executionStartDate = json.exe_start_date;
		this.executionEndDate = json.exe_end_date;
		this.attachments = json.attachments;
		this.status = json.status.name;
		this.testStepLogs = json.test_step_logs;
		this.note = json.note || "";
		return this;
	}

	_refreshURL() {
		this.createURL = `/api/v3/projects/${this.projectId}/test-runs/${this.testRunId}/auto-test-logs`;
	}

}

