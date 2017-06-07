var FileUploader = require('../build/services/FileUploader').FileUploader;
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

    it('should not throw an error when the xml has no "testsuites"', () => {
        expect(function() { return fu.getJUnitTestCases(testJsonWithoutTestSuites) }).not.toThrowError();
    });

    it('should not throw an error when the xml has "testsuites"', () => {
        expect(function() { return fu.getJUnitTestCases(testJsonWithTestSuites) }).not.toThrowError();
    });

});