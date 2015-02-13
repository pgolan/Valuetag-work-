alert('Hello');

$.post('http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=dominos',"",
    function(response)
    {
        alert(response);
    }
  );