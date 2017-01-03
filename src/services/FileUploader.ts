import { AutomationTestLog } from '../models/AutomationTestLog';
import { Finder } from './Finder';
import { Saver } from './Saver';
import { JUnitTestCase } from "../models/test_result_models/JUnitTestCase";
import * as xml2js from "xml2js";

export class FileUploader {
    finder: Finder;
    saver: Saver;
    projectId: number;
    moduleId: number;
    moduleType: string;
    private uploadNew: boolean;

	constructor(host, token) {
		this.finder = new Finder(host, token);
		this.saver = new Saver(host, token);
		this.uploadNew = false;
	}

	debug(bool) {
		this.finder.debug(bool);
		this.saver.debug(bool);
		return this;
	}

	uploadJUnitResults(xml) {
		return this.parseXML(xml).then((json) => {
			return this.finder.findTestRunsInModule(this.projectId, this.moduleId, this.moduleType).then((testRuns) => {
				let jUnitTestCases = FileUploader.getJUnitTestCases(json);
				let promises = [];
				for (let testCase of jUnitTestCases) {
					for (let testRun of testRuns) {
						if (testCase.id == testRun.testCaseId) {
							let log = new AutomationTestLog();
							log.status = testCase.status;
							log.executionStartDate = new Date().toISOString();
							log.executionEndDate = new Date().toISOString();
							log.name = "QTM.FileUploader";
							log.automationContent = "QTM.FileUploader";
							log.projectId = this.projectId;
							log.testRunId = testRun.id;
							promises.push(this.saver.saveNew(log));
						}
					}
				}
				return Promise.all(promises);		
			});
		})
	}

	parseXML(xml) {
        let parser = new xml2js.Parser();
		return new Promise(function(resolve, reject) {
			parser.parseString(xml, function(err, json) {
				if (err) {
					reject(err);
				}
				else {
					resolve(json);
				}
			});
		});
	}

	static getJUnitTestCases(json) {
		let testCases = [];
		let suites = json.testsuites.testsuite;
		for (let suite of suites) {
			for (let testCase of suite.testcase) {
                let id = testCase.$.name.match(/#(\d+)/)[1];
                let status = testCase.failure == true ? "FAIL" : "PASS";
				testCases.push(new JUnitTestCase(id, status));
			}
		}
		return testCases;
	}
}




