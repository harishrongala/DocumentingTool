function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: '18lkBzxxLKYAqyiQb0FGdSXjPOvHiLrNQqhKwDYQP6mA',  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: 'Sheet1!A1:F1',  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'RAW',  // TODO: Update placeholder value.

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.
  };

//checkForDuplicates();
}


function checkForDuplicates(tagValue){
  var params = {
    spreadsheetId: '18lkBzxxLKYAqyiQb0FGdSXjPOvHiLrNQqhKwDYQP6mA',  // TODO: Update placeholder value.
    range: 'Sheet1!F:F',
    majorDimension: "COLUMNS"
  };


  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    //console.log(response.result.values[0]);
    //console.log(response.result.values.length)
    dat = response.result.values[0];
    temp = new Set(dat)
    dat.push(tagValue)
    ref = new Set(dat)
    //console.log(temp)
  //  console.log(ref)
    globalIndex = temp.size
    duplicate = (ref.size==temp.size)
    setTimeout(function(){validateFrom()},300)
  //  console.log(duplicate)

  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });

}

duplicate = "";
globalIndex = 0

function validateFrom(){
if(duplicate)
  {
    $('#unavailableTagMsg').html("The tag name "+ $('#aTag').val()+" is not available! You already used it")
    $('#unavailableTag').modal('show')
  }

  else{
    var valueRangeBody = {
  "range": "Sheet1!A1:F1",
  "majorDimension": "ROWS",
  "values": [
    [
      new Date(),
      $('#adSource').val(),
      $('#adMedium').val(),
      $('#adCampaignName').val(),
      $('#adObjective').val(),
      $('#aTag').val()
    ]
  ]
    };

    writeToSheets(valueRangeBody);

// Finalized - Do not change

funs = 'function step1(label){var anc = $("a");for(i=0;i&lt;anc.length;i++){if(anc[i].innerText==label){break;}}anc[i].click();};function step2(){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].outerHTML.match("addRow")=="addRow"){break;}}but[i].click()};function step3(index, tag, value){$table'+"=$('.gtm-vendor-template-simple-table-md').find('input');$table.eq(index[0]).val(tag).change();$table.eq(index[1]).val(value).change();};"+'function step4(){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].innerText=="SAVE"){break;}}but[i].click()};';

cust = "tag='"+$('#aTag').val()+"';indices=["+((globalIndex*2)-2)+','+((globalIndex*2)-1)+"];"+"source='"+$('#adSource').val()+"';campaign='"+$('#adCampaignName').val()+"';medium='"+$('#adMedium').val()+"';objective='"+$('#adObjective').val()+"';";

set = 'timeout = 2000;SName = "Lookup Source";MName = "Lookup Medium";CName = "Lookup Campaign";OName = "Lookup Obj";setTimeout(function(){step1(SName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag, source);setTimeout(function(){step4();setTimeout(function(){step1(MName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,medium);setTimeout(function(){step4();setTimeout(function(){step1(CName);setTimeout(function(){step2();setTimeout(function(){step3(indices,tag,campaign);setTimeout(function(){step4();setTimeout(function(){step1(OName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,objective);setTimeout(function(){step4();},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout);},10);';

    $('#modalCode').html(funs+cust+set);
    $('#myModal').modal('show')
  }

}


function writeToSheets(valueRangeBody){
  var params = {
    spreadsheetId: '18lkBzxxLKYAqyiQb0FGdSXjPOvHiLrNQqhKwDYQP6mA',
    range: 'Sheet1!A1:F1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
  };



  var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  var API_KEY = 'AIzaSyCEKomx31l_BDus0XUr460WSlh8xYAw1CA';  // TODO: Update placeholder with desired API key.

  var CLIENT_ID = '958606527783-n8gtfit8a47bn1bmvt4f4ks4j05e9jaq.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/spreadsheets'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
