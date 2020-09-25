//
// Process results of submitting the manifest.
// Perform validation and return post-processed parameters
//
function formPostProcessor(oParameters, oData) {
	var aVacationTypes = oData.dataSets[3].data.d.results;
	var found = false;
	for (var i in aVacationTypes) {
		if (oParameters.absenceTypeCode === aVacationTypes[i].AbsenceTypeCode) {
			found = true;
			oParameters.absenceTypeName = aVacationTypes[i].AbsenceTypeName;
			oParameters.approverName = aVacationTypes[i].toApprover.results[0].Name;
			oParameters.approverPernr = aVacationTypes[i].toApprover.results[0].Pernr;
			break;
		}
	}
	// check vacation type
	if (!found) {
		return {
			status: "failure",
			errorMessage: "Invalid vacation code: " + oParameters.absenceTypeCode,
			parameters: oParameters
		}
	}

	// check start date
	var oDate = new Date(oParameters.startDate);
	if (isNaN(oDate.getTime())) {
		return {
			status: "failure",
			errorMessage: "Invalid start date",
			parameters: oParameters
		}
	}

    // check end date
    var oDate2 = new Date(oParameters.endDate);
	if (isNaN(oDate2.getTime())) {
		return {
			status: "failure",
			errorMessage: "Invalid end date",
			parameters: oParameters
		}
	}

	var startDateTime = new Date(oParameters.startDate).getTime();
    var endDateTime = new Date(oParameters.endDate).getTime();
    if (startDateTime>endDateTime) {
        return {
            status: "failure",
            errorMessage: "End Date cannot be before Start Date",
            parameters: oParameters
        }
    }

	var startDate = "\\/Date(" + startDateTime + ")\\/";
	var endDate = "\\/Date(" + endDateTime + ")\\/";

	var oNewParameters = {
		"pernr": oData.dataSets[0].data.d.results[0].EmployeeID,
		"startDate": startDate,
		"endDate": endDate,
		"absenceTypeName": oParameters.absenceTypeName,
		"absenceTypeCode": oParameters.absenceTypeCode,
		"approverName": oParameters.approverName,
		"approverPernr": oParameters.approverPernr
	};

	return {
		status: "success",
		parameters: oNewParameters
	}
}