function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('form.html');
        
}

function uploadFile(data, fileName, id) {
	try {
      
        //data to file
        var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        ss = Utilities.newBlob(bytes, contentType, fileName);
      
        //create folder
        var dropbox = "TOKYO TRIP PHOTOS";
        var folder, folders = DriveApp.getFoldersByName(dropbox);
      
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(dropbox);
        }
       
        //create file
		    var file;
        ss.setName(fileName);
        file = folder.createFile(ss);
      return {
        'url' : folder.getUrl().toString(),
        'id' : id,
        // To give response to the client which file has uploaded
      }
	} catch (e) {
      Logger.log(e);
		return e.toString();
	}
}