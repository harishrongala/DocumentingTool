// Dynamic variables

batchLen = 0
Sobj = {}
Mobj = {}
Cobj = {}
Oobj = {}

// Core function definitions

x = 'function openLookupTable(label){stat = true;var anc = $("a");for(i=0;i<anc.length;i++){if(anc[i].innerText==label){stat = false;break;}}if(stat){var errorMsg = "Lookup table with label "+label+" not found";alertDeveloper(errorMsg);}else{anc[i].click();}};function addRow(){stat = true;var but = $("button");for(i=0;i<but.length;i++){if(but[i].outerHTML.match("addRow")=="addRow"){stat = false;break;}}if(stat){var errorMsg = "addRow Button not found";alertDeveloper(errorMsg);}else{but[i].click();}};function fillIn(obj){$table = $("gtm-vendor-template-simple-table-md").find("input");indexIter = obj.indexStartsAt;for(i=0;i<obj.length;i++){$table.eq(indexIter).val(obj.tagArray[i]).change();$table.eq(indexIter+1).val(obj.valueArray[i]).change();indexIter+=2;}};function saveVariable(){stat = true;var but = $("button");for(i=0;i<but.length;i++){if(but[i].innerText=="SAVE"){stat = false;break;}}if(stat){var errorMsg = "SAVE Button not found";alertDeveloper(errorMsg);}else{but[i].click();}};';

// Other function definitions

x += 'function alertDeveloper(msg){console.log(msg);}';

// Constants

x += 'timeout = 2000;SName = "Lookup Source";MName = "Lookup Medium";CName = "Lookup Campaign";OName = "Lookup Obj";';

// Generic activation script

x += 'setTimeout(function(){openLookupTable(SName);setTimeout(function(){addRow(batchLen);setTimeout(function(){fillIn(Sobj, batchLen);setTimeout(function(){saveVariable();setTimeout(function(){openLookupTable(MName);setTimeout(function(){addRow(batchLen);setTimeout(function(){fillIn(Mobj, batchLen);setTimeout(function(){saveVariable();setTimeout(function(){openLookupTable(CName);setTimeout(function(){addRow(batchLen);setTimeout(function(){fillIn(Cobj, batchLen);setTimeout(function(){saveVariable();setTimeout(function(){openLookupTable(OName);setTimeout(function(){addRow(batchLen);setTimeout(function(){fillIn(Oobj, batchLen);setTimeout(function(){saveVariable();},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout);},10);';



