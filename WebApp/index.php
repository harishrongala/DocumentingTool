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
    </button>
    <a class="navbar-brand"><i class="glyphicon glyphicon-paperclip"></i><strong> CHRONICLE</strong></a>
  </div>
  <div class="collapse navbar-collapse" id="mynavbar">
  <ul class="nav navbar-nav navbar-right">
  </ul>
  <button id="signinText" onclick="handleSignInClick()" class="btn btn-info navbar-btn pull-right">Login Status</button>
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
      <input type="name" class="form-control" id="adObjective" name="objective" placeholder="Brand Awareness">
    </div>
  </div>

    <label for="objective">Custom tag </label>
    <div class="form-group">
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
    <input type="name" class="form-control" id="aTag" name="objective" placeholder="FBAd-07">
    </div>
    </div>


    <label for="Notes" >Additional Notes </label>
    <div class="form-group">
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-file"></i></span>
    <input type="text" class="form-control" id="adNotes" name="Notes" placeholder="Targeted College students ages 18-25">
    </div>
  </div>

    <button type="submit" class="btn btn-primary" id="formSubmitBut">Submit</button>
  </form>

<!--- Form Ends -------------->

<!------ Code Modal ----------->

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4><strong class="modal-title">Hurray ! One last step</strong></h4>
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
          <button type="button" class="btn btn-success" onclick="copyURL()"><span class="badge">3</span> Copy URL</button>
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



</div>
</div>
</body>
</html>
