# qtestmanager-node
A library to simplify the consumption of QA Symphony's qTest Manager API


## Installation
`npm install --save qtestmanager-node`

## Updates
### 1.0.0
Initial release


## Usage
`qtestmanager-node` offers a variety of ways to integrate with qTest Manager. 
It is designed to be as light-weight, or full featured as needed.

### Authenticate

```javascript
var QTMAuthenticator = require('qtestmananger-node').Authenticator;
var authenticator = new QTMAuthenticator("https://yourhost.qtestnet.com");

authenticator.login(username, password).then(function(accessToken) {
	// do something with accessToken
});
```

### Upload XML Results
```javascript
var QTMFileUploader = require('qtestmananger-node').FileUploader;
var fs = require('fs');
var xml = fs.readFileSync(pathToXML, "utf-8");

var uploader = new QTMFileUploader("https://yourhost.qtestnet.com", token);
// ID of the target project
uploader.projectId = 12345;

// Type of module to which you are uploading
// The uploader uses QTM's search API. It is
// the same syntax as the 'Data Query' in
// Test Execution
uploader.moduleType = "Test Cycle"

// Id of the module to which you are uploading
uploader.moduleId = 67890;

// Upload results
uploader.uploadJUnitResults(xml).then((responses) => {
	// handle responses from POSTed test executions
    // and don't forget to call authenticator.logout()
    // once you are done.
});
```

### Execute a Test Run
```javascript
var QTMSaver = require('qtestmanager-node').Saver;
var QTMLog = require('qtestmanager-node').AutomationTestLog;

var saver = new QTMSaver("https://yourhost.qtestnet.com", token);
var log = new QTMLog():

// Create the log
// The properties below are required
log.projectId = 32495;
log.testRunId = 7217978;
log.name = "Name";
log.automationContent = "Automation Content";
log.executionStartDate = new Date().toISOString();
log.executionEndDate = new Date().toISOString();
log.status = "PASS";

// Save the new log
saver.saveNew(log).then(function(response) {
	// Handle response
});
```
#### Disclaimer
This package was developed by me  to make my life, and the life of my co-workers, a little easier. `qtestmanager-node` is not developed by, or associated with QASymphony.

