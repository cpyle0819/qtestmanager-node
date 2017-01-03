import { Link } from "./Link";
import {QTestResource} from "./QTestResource";

export class QueryResult {
    readonly links: Link[];
    readonly page: number;
    readonly pageSize: number;
    readonly total: number;
    readonly items: QTestResource[];

	get pageCount() {
		return QueryResult.numPages(this.total, this.pageSize);
	}

	static fromJSON(json) {
		return Object.create(QueryResult, json);
	}

	private static numPages(t,s) {
	  return t<s?1:(Math.floor(t/s)+(t%s==0?0:1));
	}
}