import axios from 'axios';
import querystring = require('querystring');

export class Requester {
    private _driver;
    private _reqInterceptor;
    private _resInterceptor;

	constructor(host) {
		this._driver = axios.create({ baseURL: host });
	}

	set header(header) {
		this._driver.defaults.headers[header.name] = header.value;
	}
	get driver() {
	    return this._driver;
    }

	debug(on) {
		if (on) {
			this._reqInterceptor = this._driver.interceptors.request.use(function (config) {
				console.log("----- Request -----");
				console.log(config.method, config.url);
				console.log(config.headers);
				console.log(config.data);
				console.log("----- End Request -----");
				return config;
			}, function (error) {
				return Promise.reject(error);
			});
			this._resInterceptor = this._driver.interceptors.response.use(function (response) {
				console.log("----- Response -----");
				console.log(response.headers);
				console.log(response.data);
				console.log("----- End Response -----");
				return response;
			}, function(error) {
				return Promise.reject(error);
			});
		} else {
			if (this._reqInterceptor) this._driver.interceptors.request.eject(this._reqInterceptor);
			if (this._resInterceptor) this._driver.interceptors.response.eject(this._resInterceptor);
		}
		return this;
	}

	clearHeaders() {
		this._driver.defaults.headers = {};
	}

	static stringify(form) {
		return querystring.stringify(form);
	}
}