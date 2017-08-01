function step1(label){var anc =  $("a");for(i=0;i<anc.length;i++){if(anc[i].innerText==label){break;}}anc[i].click();}
function step2(){var but = $("button");for(i=0;i<but.length;i++){if(but[i].outerText=="  + Add Row   "){break;}}but[i].click()}
function step3(index, tag, value){$table = $('.gtm-vendor-template-simple-table-md').find('input');$table.eq(index[0]).val(tag).change();$table.eq(index[1]).val(value).change();}
function step4(){var but = $("button");for(i=0;i<but.length;i++){if(but[i].innerText=="SAVE"){break;}}but[i].click()};

tag="quora";indices=[0,1];source="dumbo";campaign="mumbo";medium="jumbo";objective="lkjj";

timeout = 800;SName = "Lookup Source";MName = "Lookup Medium";CName = "Lookup Campaign";OName = "Lookup Obj";setTimeout(function(){step1(SName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag, source);setTimeout(function(){step4();setTimeout(function(){step1(MName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,medium);setTimeout(function(){step4();setTimeout(function(){step1(CName);setTimeout(function(){step2();setTimeout(function(){step3(indices,tag,campaign);setTimeout(function(){step4();setTimeout(function(){step1(OName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,objective);setTimeout(function(){step4();},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout);},10);
