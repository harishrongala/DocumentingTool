// URLS and API Keys
tagManagerPageURL = config.tagManagerPageURL;
spreadSheetID = config.spreadSheetID;
spreadSheetRange = config.spreadSheetRange;
apiKey = config.apiKey;
clientID = config.clientID;

// Global Variables
suggestionDict = {'facebook':'Fb','linkedin':'Ln','Quora':'Qu'};
duplicate = "";
globalIndex = 0
var uniqueRowNum = 0
shareableLink = ""
suggestions = false
sug1 = ""
sug2 = ""
sug3 = ""

function suggestionClick(value){
  switch (value) {
    case 1:
      $('#aTag').val(sug1);
      break;
    case 2:
      $('#aTag').val(sug2)
      break;
    case 3:
      $('#aTag').val(sug3)
      break;

  }
}

$(document).ready(function (){
  //$('#modalURL').html("http://byteacademy.co/#Fb");
  $('#formSubmitBut').prop('disabled', false)
  $('#adFormData').submit(function(event){
    event.preventDefault();
  });
});

function showNonByteModal(){
  $('#nonByteModal').modal('show');
}

function shortenBitly(){
  console.log(document.getElementById('nonBytePageLink').value);
    $.getJSON(config.bitlyURL,{"access_token": config.bitlyAccessToken, "longUrl": document.getElementById('nonBytePageLink').value},function(response){
    if(response.status_code==200){
      $('#bitURL').html(response.data['url']);
    }
    else{
      alert("Sorry, something wrong with the URL");
    }
  });
}

function bitlyCopy(){
  var copiedText = document.querySelector('.bitCopyURLArea');
  copiedText.select();
  document.execCommand('copy');
}


function shortenURL(){
  $.getJSON(config.bitlyURL,{"access_token": config.bitlyAccessToken, "longUrl": document.getElementById('modalURL').innerHTML},function(response){
    if(response.status_code==200){
      $('#modalURL').html(response.data['url']);
    }
    else{
      alert("Sorry, something wrong with the URL");
    }
  });
}

function submitData(){
  // Data Validation
  if($('#pageLink').val()=="" | $('#adSource').val()=="" | $('#adCampaignName').val()=="" | $('#adMedium').val()=="" | $('#adObjective').val()=="" | $('#aTag').val()==""){
    $('#errorMsg').html("Please fill all the required fields")
    $('#blankFields').modal('show')
  }
  else {
    if($('#aTag').val().indexOf(' ')>=0){
      $('#errorMsg').html("Whitespaces are not accepted in the tag name")
      $('#blankFields').modal('show')
    }

    else{
      checkForDuplicates($('#aTag').val())
    }
  }
}


// Get the Suggestions for Tag
function getSuggestions(){
  suggest1 = ""
  suggest2 = ""
  suggest3 = ""
  rowNum = uniqueRowNum.size;
  var key = $('#adSource').val().toLowerCase();
  if(suggestionDict[key]!=null){
    suggest1 = suggestionDict[key]+rowNum
    suggest2 = suggestionDict[key] + $('#adCampaignName').val().substring(0,3).toLowerCase()+rowNum
    suggest3 = suggestionDict[key] + $('#adMedium').val().substring(0,3).toLowerCase()+rowNum
  }
  else{
    suggest1 = $('#adSource').val()[0].toUpperCase() + $('#adSource').val()[1]+rowNum;
    suggest2 = $('#adSource').val()[0].toUpperCase() + $('#adCampaignName').val().substring(0,3).toLowerCase() + rowNum
    suggest3 = $('#adSource').val()[0].toUpperCase() + $('#adMedium').val().substring(0,3).toLowerCase() + rowNum
  }
  return [suggest1,suggest2,suggest3]
}



// Get the row number
function getRowNum(){
  var params = {
    spreadsheetId: spreadSheetID,  // TODO: Update placeholder value.
    range: 'Sheet1!F:F',
    majorDimension: "COLUMNS"
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
  // Checking for duplicate tags
    uniqueRowNum = new Set(response.result.values[0]);
    console.log(uniqueRowNum);
  }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });

}



// Tag Name Suggestions
function autoSuggestions(){
  console.log("Invoked");
  if(!suggestions){
    suggestions=true;
    [sug1,sug2,sug3] = getSuggestions();
    var recom1 = '<button type="text" class="btn btn-warning" value="'+sug1+'" onclick="suggestionClick(1)" style="font-size:20px">'+sug1+'</button><span> </span>';
    var recom2 = '<button class="btn btn-success" value="'+sug2+'" onclick="suggestionClick(2)" style="font-size:20px">'+sug2+'</button><span> </span>';
    var recom3 = '<button class="btn btn-info" value="'+sug3+'" onclick="suggestionClick(3)" style="font-size:20px">'+sug3+'</button><span> </span>';
    $('#suggestTag').append(recom1);
    $('#suggestTag').append(recom2);
    $('#suggestTag').append(recom3);
  }

}


function suggestionDuplicate(){
  var params = {
    spreadsheetId: spreadSheetID,  // TODO: Update placeholder value.
    range: 'Sheet1!F:F',
    majorDimension: "COLUMNS"
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
  // Checking for duplicate tags
    dat = response.result.values[0];
    temp = new Set(dat)
    dat.push(tagValue)
    ref = new Set(dat)
    globalIndex = temp.size
    duplicate = (ref.size==temp.size)
    setTimeout(function(){validateFrom()},300) // TODO: Asynchronous API result time
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });

}

// Tagmanager URL variable
function gotoTagMgr(){
  window.open(tagManagerPageURL);
}

function copyCode(){
  var copiedText = document.querySelector('.copyArea');
  copiedText.select();
  document.execCommand('copy');
}

function copyURL(){
  var copiedText = document.querySelector('.copyURLArea');
  copiedText.select();
  document.execCommand('copy');
}


function makeApiCall() {
  var params = {
    spreadsheetId: spreadSheetID,  // TODO: Update placeholder value.
    range: spreadSheetRange,  // TODO: Update placeholder value.
    valueInputOption: 'RAW',  // TODO: Update placeholder value.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.
  };
}


function checkForDuplicates(tagValue){
  var params = {
    spreadsheetId: spreadSheetID,  // TODO: Update placeholder value.
    range: 'Sheet1!F:F',
    majorDimension: "COLUMNS"
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
  // Checking for duplicate tags
    dat = response.result.values[0];
    temp = new Set(dat)
    dat.push(tagValue)
    ref = new Set(dat)
    globalIndex = temp.size
    duplicate = (ref.size==temp.size)
    setTimeout(function(){validateFrom()},300) // TODO: Asynchronous API result time
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });

}



function validateFrom(){
  if(duplicate)
  {
    $('#errorMsg').html("The tag name "+'"'+ $('#aTag').val()+'"'+" is already in use. Please try another tag name")
    $('#blankFields').modal('show')
  }

  else{
    var valueRangeBody = {
  "range": "Sheet1!A1:G1",
  "majorDimension": "ROWS",
  "values": [
    [
      new Date(),
      $('#adSource').val(),
      $('#adMedium').val(),
      $('#adCampaignName').val(),
      $('#adObjective').val(),
      $('#aTag').val(),
      $('#adNotes').val(),
      $('#pageLink').val()+'/#'+$('#aTag').val()
    ]
  ]
    };
    shareableLink = $('#pageLink').val()+'/#'+$('#aTag').val();
    writeToSheets(valueRangeBody);

    // Finalized - Do not change
    // DO NOT CHANGE THIS BLOCK
    /*
    funs = 'function step1(label){var anc = $("a");for(i=0;i&lt;anc.length;i++){if(anc[i].innerText==label){break;}}anc[i].click();};function step2(){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].outerHTML.match("addRow")=="addRow"){break;}}but[i].click()};function step3(index, tag, value){$table'+"=$('.gtm-vendor-template-simple-table-md').find('input');$table.eq(index[0]).val(tag).change();$table.eq(index[1]).val(value).change();};"+'function step4(){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].innerText=="SAVE"){break;}}but[i].click()};';
    */
    funs = 'function step1(label){stat = true;while(stat){var anc = $("a");for(i=0;i&lt;anc.length;i++){if(anc[i].innerText==label){stat = false;break;}}}anc[i].click();};function step2(){stat = true;while(stat){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].outerHTML.match("addRow")=="addRow"){stat = false;break;}}}but[i].click()};function step3(index, tag, value){$table'+"=$('.gtm-vendor-template-simple-table-md').find('input');$table.eq(index[0]).val(tag).change();$table.eq(index[1]).val(value).change();};"+'function step4(){stat = true;while(stat){var but = $("button");for(i=0;i&lt;but.length;i++){if(but[i].innerText=="SAVE"){stat = false;break;}}}but[i].click();}';
    cust = "tag='"+$('#aTag').val()+"';indices=["+((globalIndex*2)-2)+','+((globalIndex*2)-1)+"];"+"source='"+$('#adSource').val()+"';campaign='"+$('#adCampaignName').val()+"';medium='"+$('#adMedium').val()+"';objective='"+$('#adObjective').val()+"';";
    set = 'timeout = 2000;SName = "Lookup Source";MName = "Lookup Medium";CName = "Lookup Campaign";OName = "Lookup Obj";setTimeout(function(){step1(SName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag, source);setTimeout(function(){step4();setTimeout(function(){step1(MName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,medium);setTimeout(function(){step4();setTimeout(function(){step1(CName);setTimeout(function(){step2();setTimeout(function(){step3(indices,tag,campaign);setTimeout(function(){step4();setTimeout(function(){step1(OName);setTimeout(function(){step2();setTimeout(function(){step3(indices, tag,objective);setTimeout(function(){step4();},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout)},timeout);},10);';
    // TILL THIS LINE - DO NOT CHANGE

    $('#modalCode').html(funs+cust+set);
    $('#modalURL').html(shareableLink);
    $('#myModal').modal('show')
  }

}


function writeToSheets(valueRangeBody){
  var params = {
    spreadsheetId: spreadSheetID,
    range: 'Sheet1!A1:G1',
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
  var API_KEY = apiKey;  // TODO: Update placeholder with desired API key.
  var CLIENT_ID = clientID;  // TODO: Update placeholder with desired client ID.
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
    var stat = $('#signinText');
    //stat.removeClass('btn-info')
    //stat.addClass('btn-success')
    stat.css("background-color","green")
    stat.attr("onclick","handleSignOutClick()")
    stat.html("Sign Out")
    $('#formSubmitBut').prop('disabled', false)
    makeApiCall();
    getRowNum();
  }
  else{
    var stat = $('#signinText');
    //stat.removeClass('btn-info')
    //stat.addClass('btn-danger')
    stat.css("background-color","red")
    stat.attr("onclick","handleSignInClick()")
    stat.html("Sign In")
    $('#formSubmitBut').prop('disabled', true)
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
  var stat = $('#signinText');
  //stat.removeClass('btn-info btn-danger')
  //stat.addClass('btn-success')
  stat.css("background-color","green")
  stat.attr("onclick","handleSignOutClick()")
  stat.html("Sign Out")
  $('#formSubmitBut').prop('disabled', false)
  getRowNum();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
