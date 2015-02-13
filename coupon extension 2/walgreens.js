	

    var iframe  = document.createElement ("iframe");
	iframe.src  = chrome.extension.getURL ("walgreens.html");

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

    var link='http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=walgreens';
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
       }//document.getElementById('mml').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
        //document.getElementById('hello').innerHTML="<p>No.of Coupons = "+len +"</p>"+lstr;
});

    var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
    //mya.appendChild(myimg);
   // mydiv.appendChild(myimg);


    var mytb=document.getElementById("order_summary_section");
    

     var ip=document.getElementById("enterCoupon");
    // ip.autocomplete="on";
    // ip.value="";

var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
    var mya=document.createElement("a");
    mya.id="hulala";
    mya.href="#";
  mytb.appendChild(mya);

  


  /*var myd=createElement('div');
  div.id='openModel';
  document.getElementById('openModel').innerHTML=
*/
    var hf=document.getElementById("hulala");
    hf.appendChild(myimg);

//document.body.appendChild('<a href="#openModal">View Coupons! </a><div id="openModal" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h2>Coupon Page</h2><div id="hello"> This page Displays coupons.</div></div></div>');
  var count=0,money=[],max=0,ff=0;

   function apply(dispar,n)
    {
      var ip=document.getElementById('ccode');
      var bc=document.getElementById("applyCouponAction");

      if(n>=1){
       

      //console.log(document.getElementById('couponRemove'));
      if(document.getElementById('couponRemove')!=null)  {   money[n-1]=parseFloat($('#couponTotDiv').text().split('Rs.')[1]);
       count++;console.log('Coupon '+dispar[n-1]+ ' succesful ! Savings='+money[n-1] ); 
       document.getElementById('couponRemove').click(); }

       else if(document.getElementById('roPageErrorDiv') != null)
       { money[n-1]=0;console.log('hard luck mate! coupon not applicable! Savings='+money[n-1]);}


       if(max<money[n-1]) {max=money[n-1]; ff=n-1;}
    }
       if(n==dispar.length) {
        if(max==0)  alert('No Coupon applicable ! ');
        else
        {
          ip.value=dispar[ff];
        alert('no of coupons succesful=\n ' + count+'\n The maximum discount achieved is ' +max
        +' \n For discount use coupon '+ dispar[ff]+ ' '); return;}
        }
      
      
       ip.value=dispar[n];
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
  