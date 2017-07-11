import { QTestResource } from './QTestResource';
import {Property} from "./Property";

export class Requirement extends QTestResource {


properties : Property[];
// name : string;
// links : Link[];
// private id : number;
private pid : number;
private _projectID : number;
private _parentID : number;


constructor(){
	super();
}

	get projectID() {
		return this._projectID;
	}

	set projectID(id) {
		this._projectID = id;
		this.refreshURL();
	}

	get parentID(){
		return this._parentID;
	}

	set parentID(id){
		this._parentID = id;
		this.refreshURL();
	}

	toJSON() {
		return {
			links: this.links,
			id: this.id,
			name: this.name,
			
		};
	}

	static fromJSON(json: any) {
        Object.create(Requirement, json);
	}

	refreshURL() {
		this.createURL = `/api/v3/projects/${this.projectID}/requirements?parentId=${this.parentID}`;
		this.updateURL = `/api/v3/projects/${this.projectID}/requirement/${this.id}`;
	}

}