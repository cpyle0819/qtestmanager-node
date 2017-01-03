import { Link } from "./Link";
import {QTestResource} from "./QTestResource";

export class QueryResult {
    readonly links: Link[];
    readonly page: number;
    readonly pageSize: number;
    readonly total: number;
    readonly items: QTestResource[];

    constructor(json: any) {
        this.links = json.links;
        this.page = json.page;
        this.pageSize = json.pageSize;
        this.total = json.total;
        this.items = json.items;
    }

	get pageCount() {
		return QueryResult.numPages(this.total, this.pageSize);
	}

	private static numPages(t,s) {
	  return t<s?1:(Math.floor(t/s)+(t%s==0?0:1));
	}
}