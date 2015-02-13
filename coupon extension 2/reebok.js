	

    var iframe  = document.createElement ("iframe");
	iframe.src  = chrome.extension.getURL ("reebok.html");

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

    var link='http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=reebok';
var dispar=[];
  $.getJSON(link, function(data) {
    //data is the JSON string
    //console.log(data);
    
    var jst=JSON.stringify(data);
     var obj = JSON.parse(jst);
     var len=obj.response.docs.length;
  var x;var lstr='';
     for(x=0;x<len;x++)
       { lstr=lstr+"   " +obj.response.docs[x].coupenCode; 
        dispar[x]=obj.response.docs[x].coupenCode;
       }
});

    

    var mytb=document.getElementById('dwfrm_cart');
    
    var mya=document.createElement("a");
    mya.id="hulala";
    mya.href="#";
  mytb.appendChild(mya);

  var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");


  
    var hf=document.getElementById("hulala");
    hf.appendChild(myimg);

//document.body.appendChild('<a href="#openModal">View Coupons! </a><div id="openModal" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h2>Coupon Page</h2><div id="hello"> This page Displays coupons.</div></div></div>');
  var count=0,money=[],max=0,ff=0;

   function apply(dispar,n)
    {
      var ip=document.getElementById('couponinput');
      var bc=document.getElementById("dwfrm_cart_addCoupon");

      if(n>=1)
      {
            if(document.body.querySelectorAll('.errormessage')[1].textContent!=null)
            {
              money[n-1]=0;
               console.log('not applicable! Savings='+money[n-1]);
            }

       else 
       { console.log('Coupon  applicable! Savings=');}


       //if(max<money[n-1]) {max=money[n-1]; ff=n-1;}
    }
    /*
       if(n==dispar.length) {
        if(max==0)  alert('No Coupon applicable ! ');
        else
        {
          ip.value=dispar[ff];
        //alert('no of coupons succesful=\n ' + count+'\n The maximum discount achieved is ' +max
        //+' \n For discount use coupon '+ dispar[ff]+ ' '); return;}
        }
      */
      if(n==dispar.length)  return;
      
       ip.value=dispar[n];
       $('#dwfrm_cart_addCoupon').removeAttr('disabled');

       bc.click();

       console.log(ip.value);
       n=n+1;
       console.log(n +" th iteration succesful !");
      
      setTimeout(function(){apply(dispar,n);},10000);
      //apply(ar,n++,bc);
    }

    mya.onclick=function(){
        
        var i;
 apply(dispar,0);
    };
  