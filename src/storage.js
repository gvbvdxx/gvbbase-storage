var https = require("https"); //to make internet requests with.

class GvbBaseFBStorage {
    constructor(bucket) {
        if (typeof bucket == "string") {
            this.bucket = bucket;
        } else {
            throw new Error("Please provide a firebase bucket for GvbBaseStorage to use.");
        }
    }

    //The Firebase Storage Path And Hostname, Status URL is always requested so you can download and upload data.

    getFileStatusPath(file) {
		try{
        return `/v0/b/${this.bucket}/o/${encodeURIComponent(file)}`;
		}catch(e){console.log(e);}
	}
    getDownloadPath(file, token) {
		try{
        return `/v0/b/${this.bucket}/o/${encodeURIComponent(file)}?alt=media&token=${token}`;
		}catch(e){console.log(e);}
    }
    getUploadPath(file) {
		try{
        return `/v0/b/${this.bucket}/o?name=${encodeURIComponent(file)}`;
		}catch(e){console.log(e);}
    }
	getDeletePath(file) {
		try{
        return `/v0/b/${this.bucket}/o/${encodeURIComponent(file)}`;
		}catch(e){console.log(e);}
    }
    getFBStorageHostname() {
		try{
        return "firebasestorage.googleapis.com";
		}catch(e){console.log(e);}
    }

    getFBRequiredHeaders() {
        return {
			"User-Agent":"GvbBaseFBStorage"
		};
    }

    //The API

    doRequest(options) {
        var _this = this;
        return new Promise((resolve, reject) => {

            var req = https.request(options, (res) => {
                //reject if not STATUS 200 (OK)

                if (!((res.statusCode == 204)||(res.statusCode == 200))) {
                    reject("BAD STATUS "+res.statusCode);
                    return;
                }

                //It's OK!, download the data.
                var data = [];
                res.on("data", (chunk) => {
                    data.push(chunk);
                });

                res.on("end", () => {
                    //resolve with a buffer output.
                    resolve(Buffer.concat(data));
                });

            });

            //some sort of error handling.

            req.on('error', (e) => {
                reject({
                    type: "other",
                    message: e
                });
            });

            req.end();
        })
    }
    doRequestPOST(options, postdata) {
        var _this = this;
        return new Promise((resolve, reject) => {

            var req = https.request(options, (res) => {
				if (!((res.statusCode == 204)||(res.statusCode == 200))) {
                    reject("BAD STATUS "+res.statusCode);
                    return;
                }
                //It's OK!, download the data.
                var data = [];
                res.on("data", (chunk) => {
                    data.push(chunk);
                });

                res.on("end", () => {
                    //resolve with a buffer output.
                    resolve(Buffer.concat(data));
                });

            });

            //some sort of error handling.


            req.on('error', (e) => {
                reject({
                    type: "other",
                    message: e
                });
            });
            req.write(postdata);
            req.end();
        })
    }

    getFileStatus(filename) {
        var _this = this;
        return new Promise((resolve, reject) => {

            var req = https.request({
                path: _this.getFileStatusPath(filename),
                headers: _this.getFBRequiredHeaders(),
                host: _this.getFBStorageHostname(),
                method: "GET"
            }, (res) => {
				if (!((res.statusCode == 204)||(res.statusCode == 200))) {
                    reject("BAD STATUS "+res.statusCode);
                    return;
                }
                //It's OK!, download the data.
                var data = [];
                res.on("data", (chunk) => {
                    data.push(chunk);
                });

                res.on("end", () => {
                    //resolve with a buffer output.
                    resolve(Buffer.concat(data));
                });

            });

            //some sort of error handling.

            req.on('error', (e) => {
                reject({
                    type: "other",
                    message: e
                });
            });

            req.end();
        })
    }

    downloadFile(filename) {
        var _this = this;
        return new Promise((resolve, reject) => {
			//try{
            _this.getFileStatus(filename).then((statusBuffer) => {
				//try{
                var statusJSON = JSON.parse(statusBuffer).toString();
                _this.doRequest({
                    headers: _this.getFBRequiredHeaders(),
                    host: _this.getFBStorageHostname(),
                    path: _this.getDownloadPath(filename, statusJSON.downloadTokens),
                    method: "GET"
                }).then((outputBuffer) => {
                    resolve(outputBuffer);
                })//.catch(reject);
				//}catch(e){reject(e)};
			})//.catch(reject);
			//}catch(e){reject(e)};
        })
    }

    uploadFile(filename, data, ctype) {
        var _this = this;
        return new Promise((resolve, reject) => {
			var contenttype = "application/octet-stream";
			if (typeof ctype == "string") {
				contenttype = ctype;
			}
			//console.log(contenttype);
			//try{
            //_this.getFileStatus(filename).then((statusBuffer) => {
				//try{
                _this.doRequestPOST({
                    headers: {
						..._this.getFBRequiredHeaders(),
						"Content-Type":contenttype
					},
                    host: _this.getFBStorageHostname(),
                    path: _this.getUploadPath(filename),
                    method: "POST"
                }, data).then((outputBuffer) => {
                    resolve(outputBuffer);
                })//.catch(reject);
				//}catch(e){reject(e)};
			//});
			//}catch(e){reject(e)};
        })
    }
	deleteFile(filename) {
        var _this = this;
        return new Promise((resolve, reject) => {
            //_this.getFileStatus(filename).then((statusBuffer) => {
				//try{
                _this.doRequest({
                    headers: _this.getFBRequiredHeaders(),
                    host: _this.getFBStorageHostname(),
                    path: _this.getDeletePath(filename),
                    method: "DELETE"
                }).then((outputBuffer) => {
                    resolve(outputBuffer);
                })//.catch(reject);
				//}catch(e){reject(e)};
            //});
        })
    }

}

module.exports = GvbBaseFBStorage;
