function step1(label){
	var anc =  $("a")
for(i=0;i<anc.length;i++){
	if(anc[i].innerText==label){
	break;
	}
}
anc[i].click();
}

function step2(){
	var but = $("button")
	for(i=0;i<but.length;i++){
		if(but[i].outerText=="  + Add Row   "){
		break;
		}
	}
	but[i].click()
}

function step3(index, tag, value){
	$table = $('.gtm-vendor-template-simple-table-md').find('input');
	$table.eq(index[0]).val(tag).change();
	$table.eq(index[1]).val(value).change();
}

function step4(){
	var but = $("button")
	for(i=0;i<but.length;i++){
		if(but[i].innerText=="SAVE"){
		break;
		}
	}
	but[i].click()
}
