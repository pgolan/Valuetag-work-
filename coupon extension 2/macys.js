	

    var iframe  = document.createElement ("iframe");
	iframe.src  = chrome.extension.getURL ("testmacys.html");

	
	var mybod=document.getElementsByTagName('body')[0];

	mybod.appendChild(iframe);
	iframe.width="1000px";
	iframe.height="200px";

	document.body.insertBefore(iframe, document.body.firstChild);

	var btn = document.createElement("BUTTON");
    var t = document.createTextNode("best Coupon Finder In the Whole Country ! ");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
    document.body.insertBefore(btn, document.body.firstChild);

   
    var ar=["MONSOON123","HDFCCC2014","ICICIC2014","SBICREDIT1","AXISEBAY14","GODREJ10PO","WHIRLPOOL2"];
  s
 var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
   
    var mytb=document.getElementById("bagContainer");
    

     var ip=document.getElementById("promoCode");
    // ip.autocomplete="on";
    // ip.value="";

var myimg=document.createElement("img");
    myimg.src=chrome.extension.getURL("project.png");
    var mya=document.createElement("a");
    mya.id="hulala";
    mya.href="javascript:void(0)";
  mytb.appendChild(mya);

    var hf=document.getElementById("hulala");
    hf.appendChild(myimg);
    

var count=0,money=[],max=0,ff=0;
   function apply(dispar,n)
    {
      var ip=document.getElementById('promoCode');
      var bc=document.getElementById("applyPromoCode");
       

        if(n>=1){
       

      //console.log(document.getElementById('couponRemove'));
      if(document.getElementById('removePromoCode')!=null)  {   money[n-1]=parseFloat($('#orderLevelPromoContainer').text().split('-INR')[1]);
       count++;console.log('Coupon '+dispar[n-1]+ ' succesful ! Savings='+money[n-1] ); 
       document.getElementById('removePromoCode').click(); }

       else 
       { money[n-1]=0;console.log('hard luck mate! coupon not applicable! Savings='+money[n-1]);}


       if(max<money[n-1]) {max=money[n-1]; ff=n-1;}
    }
       if(n==dispar.length) {
        ip.value=dispar[ff];
        alert('no of coupons succesful=\n ' + count+'The maximum discount achieved is \n'+max+' For discount use coupon '+dispar[ff]+ ' '); return;}

      


       ip.value=dispar[n];
       bc.click();

       console.log(ip.value);
       n=n+1;
       console.log(n +" th iteration succesful !");
       
      
       
       /* if($("#errorMsgContainer").css('display')!='none')  console.log('coupon not applicable mate ! ');
        else
        {
          document.getElementById('removePromoCode  ').click();
          console.log('You saved: '+document.getElementById('bagYouSavedTotal').innerHTML);

        }
       */

      setTimeout(function(){apply(dispar,n);},5000);
      //apply(ar,n++,bc);
    }

    mya.onclick=function(){
        //var bc=document.getElementById("but_aplycpn");
        var dispar=["ICICIC2014","SBICREDIT1","AXISEBAY14","GODREJ10PO","WHIRLPOOL2","MONSOON123"];
        var i;

  
                apply(dispar,0);
    };
 