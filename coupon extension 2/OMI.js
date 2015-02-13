var link='http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=officemax';

	$.getJSON(link, function(data) {
    //data is the JSON string
    //console.log(data);
    
    var jst=JSON.stringify(data);
     var obj = JSON.parse(jst);
     var len=obj.response.docs.length;
  var x;var lstr='';
     for(x=0;x<len;x++)
        lstr=lstr+" \n  " +obj.response.docs[x].coupenCode; 
      
      //document.getElementById('mml').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
        document.getElementById('hello').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
});