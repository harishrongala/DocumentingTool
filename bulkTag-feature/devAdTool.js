
// Constant and dynamic variables

timeout = 2000;
SName = "Lookup Source";
MName = "Lookup Medium";
CName = "Lookup Campaign";
OName = "Lookup Obj";
batchLen = 0;
Sobj = {};
Mobj = {};
Cobj = {};
Oobj = {};



/* Object sample format

obj = {
	'indexStartsAt':0,
	'tagArray':['apple1','apple2','apple3'],
	'valueArray':['1','2','3']
}

*/


// Open corresponding Variable based on Variable Name
function openLookupTable(label){
	stat = true;
	var anc = $("a");
	for(i=0;i<anc.length;i++){
		if(anc[i].innerText==label){
			stat = false;
			break;
		}
	}

	if(stat){
		// Inform the developer
		var errorMsg = "Lookup table with label "+label+" not found";
		alertDeveloper(errorMsg);
	}
	else{
		anc[i].click();	
	}
	
};


// Find and click the "addRow" button
function addRow(len){
	stat = true;
	var but = $("button");
	// Looking for "addRow" button
	for(i=0;i<but.length;i++){
		if(but[i].outerHTML.match("addRow")=="addRow"){
			stat = false;break;
		}
	}

	if(stat){
		// Inform the developer
		var errorMsg = "addRow Button not found";
		alertDeveloper(errorMsg);
	}
	else{
		for(i=0;i<len;i++){
			but[i].click();
		}
	}
};




// Fill up the new fields
function fillIn(obj, batchLen){
	$table = $(".gtm-vendor-template-simple-table-md").find("input");
	indexIter = obj.indexStartsAt;
	for(i=0;i<batchLen;i++){
		$table.eq(indexIter).val(obj.tagArray[i]).change();
		$table.eq(indexIter+1).val(obj.valueArray[i]).change();
		indexIter+=2;
	}
};


// Find and Click the "Save" button
function saveVariable(){
	stat = true;
	var but = $("button");
	for(i=0;i<but.length;i++){
		if(but[i].innerText=="SAVE"){
			stat = false;break;
		}
	}
	
	if(stat){
		// Inform the developer
		var errorMsg = "SAVE Button not found";
		alertDeveloper(errorMsg);
	}
	else{
		but[i].click();	
	}
};


function alertDeveloper(msg){
	// Post this msg to the developer
	console.log(msg);
}



/* Fixed activation script

 setTimeout(function(){
 	openLookupTable(SName);
 	setTimeout(function(){
 		addRow(batchLen);
 		setTimeout(function(){
 			fillIn(Sobj, batchLen);
 			setTimeout(function(){
 				saveVariable();
 				setTimeout(function(){
 					openLookupTable(MName);setTimeout(function(){
 						addRow(batchLen);
 						setTimeout(function(){
 							fillIn(Mobj, batchLen);
 							setTimeout(function(){
 								saveVariable();
 								setTimeout(function(){
 									openLookupTable(CName);
 									setTimeout(function(){
 										addRow(batchLen);
 										setTimeout(function(){
 											fillIn(Cobj, batchLen);
 											setTimeout(function(){
 												saveVariable();
 												setTimeout(function(){
 													openLookupTable(OName);
 													setTimeout(function(){
 														addRow(batchLen);
 														setTimeout(function(){
 															fillIn(Oobj, batchLen);
 															setTimeout(function(){
 																saveVariable();
 															},timeout)
 														},timeout)
 													},timeout)
 												},timeout)
 											},timeout)
 										},timeout)
 									},timeout)
 								},timeout)
 							},timeout)
 						},timeout)
 					},timeout)
 				},timeout)
 			},timeout)
 		},timeout)
 	},timeout);
 },10);

 */
