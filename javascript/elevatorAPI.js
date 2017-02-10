



var ElevatorAPI = function(options) {
	this.options = options;


   // List all of the assets in a collection.  Returns a basic (search response-style) entry. 
   // limited to 30 assets per "page", pagenumber is 0 indexed
   this.getAssetsFromCollection = function(collectionId, pageNumber, callback) {
      var requestURL = "collections/getContentsOfCollection/" + collectionId + "/" + pageNumber;
      this.performRequest(requestURL, {}, callback);
   }

   // In Elevator, a single asset may contain many files.  This will get all of the files from the asset.  It's also
   // an easy way to get the files from any asset, even if it only has one.
   this.getAssetChildren = function(objectId, callback) {
      var requestURL = "asset/getAssetChildren/" + objectId;
      this.performRequest(requestURL, {}, callback);
   }

   // get the URL that should be placed in an <iframe> tag
   this.getEmbedContent = function(objectId, callback) {
      var requestURL = "asset/getEmbedLink/" + objectId;
      this.performRequest(requestURL, {}, callback);
   }
   
   // get the full metadata for an asset
   this.assetLookup = function(objectId, callback) {
      var requestURL = "asset/assetLookup/" + objectId;
      this.performRequest(requestURL, {}, callback);
   }
   
   // get information about a file asset - the URLs for all the various derivatives
   this.fileLookup = function(objectId, callback) {
      var requestURL = "asset/fileLookup/" + objectId;
      this.performRequest(requestURL, {}, callback);
   }

   // list all the collections in an instance.  
   this.getCollections = function(callback) {
      var requestURL = "collections/listCollections";
      this.performRequest(requestURL, {}, callback);
   }

   // perform a search.  Currently only does a general search, like the search box on the elevator page.
   this.search = function(searchTerm, pageNumber, callback) {

      var postItem = new Object;
      postItem.searchTerm = searchTerm;
      postItem.pageNumber = pageNumber;
      var requestURL = "search/performSearch/";
      this.performRequest(requestURL, postItem, callback, "POST");
   }


   // internal method used to actually contact elevator.
	this.performRequest = function(requestURL, requestBundle, callback, callType="GET") {

      var d = new Date();
      var now = Math.round(d.getTime() / 1000);
      var hash = sha1(now + this.options.authSecret);
      var self = this;
		$.ajax({
         url: this.options.baseURL + "/" + requestURL,
         data: requestBundle,
         type: callType,
         beforeSend: function(xhr){
         	xhr.setRequestHeader('Authorization-User', self.options.authUser);
         	xhr.setRequestHeader('Authorization-Key', self.options.authKey);
         	xhr.setRequestHeader('Authorization-Timestamp', now);
         	xhr.setRequestHeader('Authorization-Hash', hash);
         },
         success: function(data) { 
            try {
               response = JSON.parse(data);   
            }
            catch(err) {
               response = data;
            }
            
            callback(response);
         }
      });
	}

	
}

