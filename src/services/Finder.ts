import { Requester } from './Requester';
import { TestCase } from '../models/TestCase';
import { AutomationTestLog } from '../models/AutomationTestLog';
import { Query } from '../models/Query';
import { QueryResult } from '../models/QueryResult';
import { TestRun } from '../models/TestRun';

export class Finder extends Requester {
    private token: string;

	constructor(host, token) {
		super(host);
		this.token = token;
		this.header = {"name": "Authorization", "value": token};
		this.header = {"name": "Accept", "value": "application/json"};
		this.header = {"name": "Content-Type", "value": "application/json"};
	}

	findTestCaseByRunId(projectId, runId) {
		return this.driver.get(`/api/v3/projects/${projectId}/test-runs/${runId}?expand=testcase.teststep`)
		.then((response) => {
			return TestCase.fromJSON(response.data.test_case);
		});

	}

	findLastRun(projectId, runId) {
		return this.driver.get(`/api/v3/projects/${projectId}/test-runs/${runId}/test-logs/last-run`)
		.then((response) => {
			let testLog = new AutomationTestLog();
			return testLog.fromJSON(response.data);
		});
	}

	findTestRunsInModule(projectId, moduleId, moduleType) {
		let query = new Query();
		query.objectType = "test-runs";
		query.query = `'${moduleType}' = '${moduleId}'`;

		return this.search(projectId, query)
		.then((queryResults) => {
			let testRuns = [];
			for (let queryResult of queryResults) {
				for (let item of queryResult.items) {
					let testRun = TestRun.fromJSON(item);
					testRun.testCaseId = parseInt(testRun.getLink("test-case").match(/test-cases\/(\d+)/)[1]);
					testRuns.push(testRun);
				}
			}
			return testRuns;
		});
	}

	search(projectId, query) {
		return this.runQuery(projectId, query)
		.then((queryResult) => {
			let queries = [queryResult];
			for (var i = 2; i <= queryResult.pageCount; i++) {
				query.page = i;
				queries.push(this.runQuery(projectId, query));
			}
			return Promise.all(queries);
		});
	}

	runQuery(projectId, query) {
		let params = query.searchParams;
		return this.driver.post(`/api/v3/projects/${projectId}/search${params}`, query.toJSON())
		.then((response) => {
			return new QueryResult(response.data);
		});
	}




}



















