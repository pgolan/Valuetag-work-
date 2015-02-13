
  


chrome.tabs.getSelected(null,function(tab) 
{
    	
    var tablink = tab.url;
	//document.getElementById('gg').innerHTML=tablink;

	var arr=tablink.split(".")[1];
	document.getElementById('gn').innerHTML=arr;
	
	var sites=["flipkart","valuetagapp","jabong","zovi","dominos","ebay","snapdeal","sears","bestbuy","babiesrus","homedepot","amazon","target","macys","jcpenny","walgreens","carters","orbitz","expedia","priceline"];
	var i;	var flag=1;

	for(i=0;i<sites.length;i++)
		{
			if(arr==sites[i])	flag=1;
		}
	if(flag==1)	document.getElementById('wp').innerHTML= '<p>YES! it is one of the sites.</p>'
	else		document.getElementById('wp').innerHTML= '<p>SORRY mate ! this extension not for you! </p>'

	var link='http://65.111.164.36/valueTag/appWebService/getcoupon.php?store='+arr;
	if(flag==1)	document.getElementById('testIFrame').src=link; 
	else document.getElementById('frame').innerHTML="";
	//window.open(link);

	var htstring = document.getElementById('testIFrame').contentWindow.document.body.innerHTML;



	//var json=
	//var obj=JSON.parse(json);



document.getElementById('mml').innerHTML = htstring; 


$.getJSON(link, function(data) {
    //data is the JSON string
    console.log(data);
    //alert(data.msg);
    var jst=JSON.stringify(data);
     var obj = JSON.parse(jst);
     var len=obj.response.docs.length;
	var x;var lstr='';
     for(x=0;x<len;x++)
     		lstr=lstr+"   " +obj.response.docs[x].coupenCode;	
     	
     	document.getElementById('mml').innerHTML=lstr;

});






});

/*chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    
	alert($url);
    var turl = tabs[0].url;
    
    document.getElementById("gg").innerHtml=;
});*/