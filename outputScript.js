timeout = 800;
indices = [0,1]
values = ["dff","sdd"]
SName = "Lookup Source"
MName = "Lookup Medium"
CName = "Lookup Campaign"
OName = "Lookup Obj"
setTimeout(function(){
	step1(SName);
	setTimeout(function(){
	step2();
	setTimeout(function(){
	step3(indices, values);
	setTimeout(function(){
	step4();
	setTimeout(function(){
	step1(MName);
	setTimeout(function(){
	step2();
	setTimeout(function(){
	step3(indices, values);
	setTimeout(function(){
	step4();
	setTimeout(function(){
	step1(CName);
	setTimeout(function(){
	step2();
	setTimeout(function(){
	step3(indices, values);
	setTimeout(function(){
	step4();
	setTimeout(function(){
	step1(OName);
	setTimeout(function(){
	step2();
	setTimeout(function(){
	step3(indices, values);
	setTimeout(function(){
	step4();
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

},10)
