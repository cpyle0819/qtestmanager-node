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
	testNameRegex: RegExp;
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
				let jUnitTestCases = this.getJUnitTestCases(json);
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
							log.note = "Uploaded with qtestmanager-node";
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

	getJUnitTestCases(json) {
		if (json.testsuites) {
            let testCases = [];
            let suites = json.testsuites.testsuite;
            for (let suite of suites) {
                testCases = testCases.concat(this._getMatchingTestCases(suite.testcase));
            }
            return testCases;
        }
        else {
            return this._getMatchingTestCases(json.testsuite.testcase);
        }
	}

	_getMatchingTestCases(testCases) {
	    let testCaseArray = [];
        for (let testCase of testCases) {
            let regex = this.testNameRegex || /#(\d+)/;
            let idMatch = testCase.$.name.match(regex);
            if (idMatch) {
                let status = "failure" in testCase ? "FAIL" : "PASS";
                testCaseArray.push(new JUnitTestCase(idMatch[1], status));
            }
        }

        return testCaseArray;
    }
}
