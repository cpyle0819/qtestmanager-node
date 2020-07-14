var FileUploader = require('../build/services/FileUploader').FileUploader;
var JUnitTestCase = require('../build/models/test_result_models/JUnitTestCase').JUnitTestCase;
var fu = new FileUploader(null, null);


var testJsonWithTestSuites = {
    "testsuites": {
        "testsuite": [
            {
                "$": {
                    "name": "Invitation code",
                    "timestamp": "2017-05-17T14:33:55",
                    "hostname": "localhost",
                    "time": "4.012",
                    "errors": "0",
                    "tests": "1",
                    "skipped": "0",
                    "disabled": "0",
                    "failures": "0"
                },
                "testcase": [
                    {
                        "$": {
                            "classname": "Invitation code",
                            "name": "page should be reachable #5443852",
                            "time": "3.837"
                        }
                    }
                ]
            }
        ]
    }
};

var testJsonWithoutTestSuites = {
    "testsuite": {
        "$": {
            "name": "Invitation code",
            "timestamp": "2017-05-17T14:33:55",
            "hostname": "localhost",
            "time": "4.012",
            "errors": "0",
            "tests": "1",
            "skipped": "0",
            "disabled": "0",
            "failures": "0"
        },
        "testcase": [
            {
                "$": {
                    "classname": "Invitation code",
                    "name": "page should be reachable #5443852",
                    "time": "3.837"
                }
            }
        ]
    }
};

describe('getJUnitTestCases', () => {

    describe('when the xml has no "testsuites"', () => {

        let json = testJsonWithoutTestSuites;

        it('should not throw an error', () => {
            let testFunc = () => {
                return fu.getJUnitTestCases(json);
            };
            expect(testFunc).not.toThrowError();
        });

        it('should return an array of JUnitTestCase objects', () => {
            expect(fu.getJUnitTestCases(json)[0] instanceof JUnitTestCase).toBeTruthy();
        });
    });

    describe('when the xml has "testsuites"', () => {

        let json = testJsonWithTestSuites;

        it('should not throw an error', () => {
            let testFunc = () => {
                return fu.getJUnitTestCases(json);
            };
            expect(testFunc).not.toThrowError();
        });

        it('should return an array of JUnitTestCase objects', () => {
            expect(fu.getJUnitTestCases(json)[0] instanceof JUnitTestCase).toBeTruthy();
        });
    });
});