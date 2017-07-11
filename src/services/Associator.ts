import { Requester } from './Requester';
// import { Query } from '../models/Query';
// import { TestCase } from '../models/TestCase';
// import { Requirement } from '../models/Requirement';

//if this thing does all things linking(and unlinking) it should be able to 
export class Associator extends Requester {

	private token: string; 

	constructor(host, token){
	super(host);
	this.token = token;
	this.header = {"name": "Authorization", "value": token};
	this.header = {"name": "Content-Type", "value": "application/json"};
	
	}

	//link requirement to test case(s) by requirement and test case id(s)
	linkRequirementToTestCaseById(projectId, requirementId, testCaseIdArray){
		return this.driver.post(`/api/v3/projects/${projectId}/req-tc-links`, {
			"requirement_id" : requirementId,
			"testcase_ids" : testCaseIdArray
		})
		.then((response) => {
			//could probably use some other dependency to check
			if(response.status != 201){
				console.log(response);
			}	
		}); 
	}

	//get all associated objects

}
