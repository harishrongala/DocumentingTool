<!DOCTYPE html>
<html lang="en">
<head>
  <title>Ad-Documenting tool</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/login_custom_style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="scripts/config.js"></script>
  <script src="scripts/essential.js"></script>
  <script async defer src="https://apis.google.com/js/api.js"
    onload="this.onload=function(){};handleClientLoad()"
    onreadystatechange="if (this.readyState === 'complete') this.onload()">
  </script>

<!------------------- Navigation bar ---------------->
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#mynavbar">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand"><i class="glyphicon glyphicon-paperclip" style="color: yellow"></i><strong style="color: orange; font-size:22px"> CHRONICLE</strong></a>
  </div>
  <div class="collapse navbar-collapse" id="mynavbar">
  <ul class="nav navbar-nav navbar-right">
    <li><a id="howToUse" onclick="" class="" style="font-weight:bold; font-size:15px; color:white">How to use</a></li>
    <li><a id="nonByte" onclick="showNonByteModal()" class="" style="font-weight:bold; font-size:15px; color:white">Non Byte</a></li>
    <li><a id="signinText" onclick="handleSignInClick()" class="" style="font-weight:bold; font-size:15px; color:white">Login Status</a></li>
  </ul>
  </div>
</div>
</nav>
<!------------------- Navigation bar ends ------------------------->

</head>
<body>

<!---- Form Starts ---->

<div class="container-fluid" id="padding_needed">
<div class="row">
  <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
  <form action="" method="post" id="adFormData">

    <label for="link" >Page Link </label>
    <div class="form-group">
      <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-globe"></i></span>
      <input type="name" class="form-control" id="pageLink" name="link" value="http://byteacademy.co">
    </div>
  </div>

    <label for="source" >Ad Source </label>
    <div class="form-group">
      <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-road"></i></span>
      <input type="name" class="form-control" id="adSource" name="source" placeholder="Facebook">
    </div>
  </div>

    <label for="campaign" >Campaign Name </label>
    <div class="form-group">
      <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-th-list"></i></span>
      <input type="name" class="form-control" id="adCampaignName" name="campaign" placeholder="Summer">
    </div>
    </div>

    <label for="medium" >Ad Name </label>
    <div class="form-group">
      <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
      <input type="name" class="form-control" id="adMedium" name="medium" placeholder="FinTech-Ad-2017">
    </div>
  </div>

    <label for="objective">Objective </label>
    <div class="form-group">
      <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-check"></i></span>
      <select type="name" class="form-control" id="adObjective" name="objective">
        <option value="Traffic">Traffic</option>
        <option value="Conversions">Conversions</option>
        <option value="Brand Awareness">Brand Awareness</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

    <label for="objective">Custom tag </label>
    <div class="form-group">
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
    <input type="name" class="form-control" id="aTag" name="objective" placeholder="FBAd-07" onfocus="autoSuggestions()">
    </div>
    </div>

    <div class="form-group">
      <center>
    <div class="input-group" id="suggestTag">
    </div>
  </center>
    </div>


    <label for="Notes" >Additional Notes </label>
    <div class="form-group">
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-file"></i></span>
    <input type="text" class="form-control" id="adNotes" name="Notes" placeholder="Targeted College students ages 18-25">
    </div>
  </div>

    <button type="submit" class="btn btn-primary" id="formSubmitBut" onclick="submitData()">Submit</button>
  </form>

<!--- Form Ends -------------->

<!------ Code Modal ----------->

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3><strong class="modal-title">Hurray ! One last step</strong></h3>
         <h3><span class="label label-default">Copy this code</span>
         <span class="label label-default">Go to Tag manager</span>
         <span class="label label-default">Press Ctrl+Shift+I</span>
         <span class="label label-default">Paste the code in console</span> </h3>
      </div>


      <div class="modal-body">
        <div class="container-fluid">
          <div class="row"><textarea class="copyArea form-control alert alert-success" rows="10" id="modalCode"></textarea>
            <button type="button" class="btn btn-primary" onclick="copyCode()"><span class="badge">1</span> Copy Code</button>
            <button type="button" class="btn btn-danger" onclick="gotoTagMgr()"><span class="badge">2</span> Go to Tag Manager</button>
          </div>
        </div>

<div class="modal-footer">
          <div class="row"><textarea class="copyURLArea form-control alert alert-info" rows="1" id="modalURL" ></textarea>
            <button type="button" class="btn btn-primary" onclick="shortenURL()"> Shorten URL</button>
          <button type="button" class="btn btn-danger" onclick="copyURL()"><span class="badge">3</span> Copy URL</button>
          </div>
      </div>
</div>
    </div>
  </div>
</div>
<!------ Code Modal Ends----------->

<!--- Data Validation & Error message modal -->
<div id="blankFields" class="modal fade" role="dialog">
  <div class="modal-dialog modal-md">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4><strong class="modal-title">Message</strong></h4>
    </div>


      <div class="modal-body">
          <div class="alert alert-danger">
              <h4 id="errorMsg"><strong> </strong></h4>
          </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
<!--- Data Validation modal and Error message modal ends-->


<!-- Non Byte Modal ----------->

<div id="nonByteModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3><strong class="modal-title">Other than byteacademy.co</strong></h3>
      </div>


      <div class="modal-body">
        <div class="container-fluid">
          <label for="link" >Page Link </label>
          <div class="form-group">
            <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-globe"></i></span>
            <input type="name" class="form-control" id="nonBytePageLink" name="link" placeholder="Paste the URL to be shared">
          </div>
        </div>


      <button type="button" class="btn btn-primary pull-right" onclick="bitlyCopy()">Copy URL</button>
      <button type="button" class="btn btn-primary pull-right" onclick="shortenBitly()" style="margin-right:5px">Shorten URL</button>

        </div>
        </div>


<div class="modal-footer">
          <div class="row"><textarea class="bitCopyURLArea form-control alert alert-info" rows="1" id="bitURL" style="font-size: 18px; font-weight: bold"></textarea>
          </div>
      </div>
</div>
    </div>
  </div>

<!--- Non Byte Modal ends -->




</div>
</div>
</body>
</html>
