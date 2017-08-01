function getDistanceFromLatLonInKm() {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(space_lat-cur_lat);
  var dLon = deg2rad(space_lng-cur_lng);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(cur_lat)) * Math.cos(deg2rad(space_lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  if(d<=0.02)  // Less than or equal to 0.02
  {
    load_checkin_modal();
  }
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}















function load_complaint_modal()
{
  $('#complaintModal').modal();
}

function close_complain_modal(){
  $('#complaintModal').modal('hide');
}
function load_checkin_modal()
{
  $('#checkinModal').modal();
}

function load_checkout_modal()
{
  $('#checkoutModal').modal();
}

function close_checkout()
{
  $('#checkoutModal').modal('hide');
}

function close_checkin()
{
  $('#checkinModal').modal('hide');
}
function checkin_checkin()
{
  var tic=$('#getticketid').val();
  $.post("support/check-in.php",{ticket:tic},function(data){
    close_checkin();
  });
}

function checkout_checkout()
{
  var tic=$('#getticketid').val();
  $.post("support/check-out.php",{ticket:tic},function(data){
    close_checkout();
  });
}

$(document).ready(function (e) {
$("#complaintform").submit(function(e) {
e.preventDefault();
var send=new FormData(this);
send.append('ticket_id',$('#getticketid').val());
send.append('timereported',new Date());
if($('#spaceimage').val()=="")
{
  alert("Please take a photo of the space");
}
else {
$.ajax({
url: "support/file_complaint.php",
type: "POST",
data: send,
contentType: false,
cache: false,
processData:false,
success: function(data)
{
alert(data);
var tick=$('#getticketid').val();
$.post("./support/get_email_from_ticket.php",{ticket:tick},function(dat){
  alert(dat);
  var email=dat;
  var msg="A new complaint has been filed. Check your account and resolve it immediately to earn customer satifaction";
  var subject="New Complaint";
  $.post("http://magicparking.x10host.com/send_mail.php",{to_email:email, subject:subject, msg:msg});
});

close_complain_modal();
}
});
}
});
});
