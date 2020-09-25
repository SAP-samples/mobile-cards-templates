//
// Define functions that can be used in manifest
//
function registerFunctions(oData) {
	return {
		// this returns the current date in the form
		// YYYY-MM-DD
		"currentDate": function (args) {
			var date = new Date();
			var month = date.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			} else {
				month = "" + month;
			}
			return date.getFullYear() + "-" + month + "-" + date.getDate();
		}
	};
}