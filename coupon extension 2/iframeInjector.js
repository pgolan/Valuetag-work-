	

    var iframe  = document.createElement ("iframe");
	iframe.src  = chrome.extension.getURL ("test.html");

	var mybod=document.getElementsByTagName('body')[0];

	mybod.appendChild(iframe);
	iframe.width="1000px";
	iframe.height="200px";

	document.body.insertBefore(iframe, document.body.firstChild);
//yourDIV.appendChild(iframe);

	var btn = document.createElement("BUTTON");
    var t = document.createTextNode("best Coupon Finder In the Whole Country ! ");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
    document.body.insertBefore(btn, document.body.firstChild);

    var link='http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=ebay';
var dispar=[];
  $.getJSON(link, function(data) {
    //data is the JSON string
    console.log(data);
    
    var jst=JSON.stringify(data);
     var obj = JSON.parse(jst);
     var len=obj.response.docs.length;
  var x;var lstr='';
     for(x=0;x<len;x++)
       { lstr=lstr+"   " +obj.response.docs[x].coupenCode; 
        dispar[x]=obj.response.docs[x].coupenCode;
       }//document.getElementById('mml').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
        document.getElementById('hello').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
});

    //var ar=["MONSOON123","HDFCCC2014","ICICIC2014","SBICREDIT1","AXISEBAY14","GODREJ10PO","WHIRLPOOL2"];
   // document.getElementById("hello").innerHTML="<p> "+ar[0]+" "+ar[1]+" "+ar[2]+" "+ar[3]+" "+ar[4]+" "+ar[5]+" "+ar[6];
  /* var mydiv=document.getElementById("why2buy");
    var btn2 = document.createElement("BUTTON")
    btn2.name="modopen()";
    btn2.onclick="mod()";
    var t2 = document.createTextNode("coupon finder !! ");
    btn2.appendChild(t2);
    //Appending to DOM 
    mydiv.appendChild(btn2);

    var mya=document.createElement("a");
    //a.href="#";
    mydiv.appendChild(mya);
*/
    var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
    //mya.appendChild(myimg);
   // mydiv.appendChild(myimg);


    var mytb=document.getElementById("inc_ety");
    

     var ip=document.getElementById("xocpnety_cnt");
    // ip.autocomplete="on";
    // ip.value="";

var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
    var mya=document.createElement("a");
    mya.id="hulala";
    mya.href="#";
  mytb.appendChild(mya);

  
    var hf=document.getElementById("hulala");
    hf.appendChild(myimg);



   function apply(dispar,n)
    {
      var ip=document.getElementById('xocpnety_cnt');
      var bc=document.getElementById("but_aplycpn");

     
      if(document.getElementById('errdiv') != null)
        console.log('hard luck mate! coupon not applicable! ');
      else console.log('lucky bitch! coupon appliable !');

       if(n==dispar.length) {alert('no coupon applicable');return;}

       ip.value=dispar[n];
       bc.click();

       console.log(ip.value);
       n=n+1;
       console.log(n +" th iteration succesful !");
      
       
      setTimeout(function(){apply(dispar,n);},5000);
      //apply(ar,n++,bc);
    }

    mya.onclick=function(){
        var bc=document.getElementById("but_aplycpn");
        //var ar=["HDFCCC2014","ICICIC2014","SBICREDIT1","AXISEBAY14","GODREJ10PO","WHIRLPOOL2","MONSOON123"];
        var i;

     /*   for(i=0;i<ar.length;i++)
        {
          ip.value=ar[i];
          bc.click();
        }
*/
                apply(dispar,0);
    };
  