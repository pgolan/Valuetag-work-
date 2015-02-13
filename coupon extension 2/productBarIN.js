$(document).delegate('#resCloseImage', 'click', function () {
    $('#popupResBox').hide();
});

$(document).delegate('#showPopupRes', 'mouseover', function () {
    $('#resultBox').css({
        display: 'block'
    });
});
$(document).delegate('#showPopupRes', 'mouseout', function () {
    $('#resultBox').css({
        display: 'none'
    });
});

$(document).delegate('#showPopupCoupon', 'mouseover', function () {
    $('#couponBox').css({
        display: 'block'
    });
});
$(document).delegate('#showPopupCoupon', 'mouseout', function () {
    $('#couponBox').css({
        display: 'none'
    });
});


function callSTB() {
    getProductStr();
    if (dFlag) {
        sTB();
        getCoupons();
        $('body').before(rBoxJ());
        $('head').append(rScpt);
        $('#resultBox::-webkit-scrollbar-track').css({
            '-webkit-box-shadow':'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor:'#F5F5F5'
        });
        $('#resultBox::-webkit-scrollbar').css({
            width: '8px',
            backgroundColor:'#F5F5F5'
        });
        $('#resultBox::-webkit-scrollbar-thumb').css({
            backgroundColor:'rgba(221, 85, 8, 0.7)'
        });
        $('#popupResBox').css({
            display: 'none'
        });
    }
}

function sTB() {
    if (str) {
        var temp = {
            'udid': str,
            'dFlag': 1,
            'price': prc,
            'url': window.location.href,
            'cntry': 'IN'
        };
        var webURL = "http://65.111.164.36/valueTag/newTag.php";
        $.ajax({
            url: webURL,
            type: "POST",
            data: JSON.stringify(temp),
            dataType: 'json',
            processData: false
        }).done(function (data) {
            $('#popupResBox').css({
                display: 'inline'
            });
            if (data) {
                var t = 0,
                    gtFlg = false,
                    minPriceFlag = true;
                if (data.length > 0) {
                    var limit = 0,
                        hgt = 0,
                        minPrice = parseFloat(prc),
                        store = '',
                        sURL;
                    document.getElementById('compareButton').style.setProperty('display', 'block', 'important');
                    for (var j = 0; j < data.length; j++) {
                        if (data[j]) {
                            if (minPriceFlag && parseFloat(String(data[j]['price']).replace(/.*?\s+?/g, '')) < minPrice) {
                                minPrice = parseFloat(String(data[j]['price']).replace(/.*?\s+?/g, ''));
                                store = data[j]['sellername'];
                                sURL = data[j]['visitstore'];
                                minPriceFlag = false;
                            }
                            if (!/undefined/.test(data[j]['visitstore']) && data[j]['visitstore']) {
                                gtFlg = true;
                                $('#resultBox').append(
                                    $("<div>").css({
                                        height: '70px',
                                        padding: '3px',
                                        margin: '0 0 1px 0',
                                        background: 'rgb(250, 250, 250)',
                                        boxSizing: 'content-box'
                                    }).append(
                                        $("<a>", {
                                            href: data[j]['visitstore'],
                                            target: '_blank',
                                            class : "pvaluetag img-"+j
                                        }).css('cssText', 'display: inline-block !important; width:75px; height:70px;float:left;').append(
                                            $("<img>", {
                                                src: data[j]['imgLink']
                                            }).css({
                                                height: '60px',
                                                maxWidth: '60px',
                                                display: 'block',
                                                padding: '4px',
                                                boxShadow: 'rgb(143, 143, 143) 0px 2px 6px 1px',
                                                margin:'4px auto'
                                            })
                                        ),
                                        $("<div>").css({
                                            float: 'right',
                                            height: '70px',
                                            width: '77%',
                                            display: 'inline',
                                            paddingTop: '3px'
                                        }).append(
                                            $("<a>", {
                                                href: data[j]['visitstore'],
                                                target: '_blank',
                                                class : "pvaluetag pvaluetagtext-"+j
                                            }).css('cssText', 'display: inline !important').append(
                                                $("<span>", {
                                                    text: data[j]['productName'].replace(/\$/g, '')
                                                }).css({
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block',
                                                    'font-family': 'Arial',
                                                    'font-weight': 'normal',
                                                    color: 'rgb(56, 56, 56)',
                                                    'font-size': '13px',
                                                    padding: '5px 0px 5px 4px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight:'normal',
                                                    textOverflow: 'ellipsis'
                                                })
                                            ),
                                            $("<span>", {
                                                text: '₹ ' + data[j]['price']
                                            }).css({
                                                display: 'inline',
                                                'font-family': 'Arial',
                                                color: 'rgb(223, 9, 0)',
                                                'font-size': '18px',
                                                fontWeight:'bold',
                                                padding: '8px 30px',
                                                float: "left"
                                            }),
                                            $("<a>", {
                                                href: data[j]['visitstore'],
                                                target: '_blank',
                                                class : "pvaluetag pvaluetagseller-"+j
                                            }).css('cssText', 'display: inline !important').append(
                                                $("<img>", {
                                                    src: chrome.extension.getURL("img/"+data[j]['sellername'].trim().replace(/\s+/g, '_').toLowerCase()+".png")
                                                }).css({
                                                    display: 'inline-block',
                                                    maxWidth:'110px',
                                                    height: '40px',
                                                    padding: '1px',
                                                    border: '1px solid #C5C5C5',
                                                    float: 'right'
                                                })
                                            )
                                        )

                                    )
                                );
                                hgt = hgt + 70;

                            }
                        }
                    }
                    if (hgt > 400) $('#resultBox').css({
                        height: '400px',
                        overflowY: 'scroll'
                    });
                    var re = new RegExp(store, "gi");
                    if (re.test(window.location.host)) $('#hurraybox').text('This is the best price !');
                    else {
                        $('#hurraybox').html('Found minimum price <b style="color:#C21515;font-weight:bold;font-style:normal;">' + '₹ ' + minPrice + '</b> at <b style="color:#C21515;font-weight:bold;font-style:normal;">' + store + '</b>');
                        $('#hurraybuy').attr('href', sURL).css({
                            display: 'inline-block !important'
                        });
                        document.getElementById('hurraybuy').style.setProperty('display', 'inline-block', 'important');
                    }
                } else {
                    $('#hurraybox').text('This is the best price !');
                    $('#showPopupRes').css({
                        display: 'none'
                    });
                }
            } else {
                $('#hurraybox').text('This is the best price !');
                $('#showPopupRes').css({
                    display: 'none'
                });
            }
        }).fail(function () {
            wL = true;
            wF = false;
        });
    }
}

function getCoupons() {
    if (str) {
        var webURL = "http://65.111.164.36/valueTag/appWebService/getcoupon.php?store="+window.location.hostname.split(/\./)[window.location.hostname.split(/\./).length - 2];
        //var webURL = "http://65.111.164.36/valueTag/appWebService/getcoupon.php?store=Ebay"
        $.ajax({
            url: webURL,
            type: "POST",
            dataType: 'json',
            processData: false
        }).done(function (data) {
            var hgt = 0;
            if (data && data.response.numFound > 0) {
                document.getElementById('couponButton').style.setProperty('display', 'block', 'important');
                for (var j = 0; j < data.response.numFound; j++) {
                    $('#couponBox').append(
                        $("<div>").css({
                            height: '70px',
                            padding: '3px',
                            margin: '0 0 1px 0',
                            background: 'rgb(250, 250, 250)',
                            boxSizing: 'content-box'
                        }).append(
                            $("<span>", {
                                text: data['response']['docs'][j]['coupenText']
                            }).css({
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                'font-family': 'Arial',
                                'font-weight': 'normal',
                                color: 'rgb(56, 56, 56)',
                                'font-size': '13px',
                                padding: '5px 0px 5px 4px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                fontWeight:'normal',
                                textOverflow: 'ellipsis'
                            }),
                            $("<span>", {
                                text: data['response']['docs'][j]['coupenCode']
                            }).css({
                                display: 'inline-block',
                                width:'160px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                fontFamily: 'Arial',
                                color: 'rgb(0, 114, 96)',
                                textAlign: 'center',
                                fontSize: '15px',
                                boxShadow: 'inset 0 0 6px rgba(114, 114, 114, 0.75)',
                                marginLeft: '27%',
                                fontWeight:'bold',
                                padding: '12px 5px'
                            })
                        )
                    );
                    hgt = hgt + 70;
                }
                if (hgt > 400) $('#couponBox').css({
                    height: '400px',
                    overflowY: 'scroll'
                });
            }else{
                $('#couponBox').append(
                    $("<div>").css({
                        height: '70px',
                        padding: '3px',
                        margin: '0 0 1px 0',
                        background: 'rgb(250, 250, 250)',
                        boxSizing: 'content-box'
                    }).append(
                        $("<span>", {
                            text: 'No coupon available for this store !'
                        }).css({
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            'font-family': 'Arial',
                            'font-weight': 'normal',
                            color: 'rgb(56, 56, 56)',
                            'font-size': '13px',
                            padding: '5px 0px 5px 4px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            fontWeight:'normal',
                            textOverflow: 'ellipsis'
                        })
                    )
                );   
            }
        }).fail(function () {
            $('#couponBox').append(
                $("<div>").css({
                    height: '70px',
                    padding: '3px',
                    margin: '0 0 1px 0',
                    background: 'rgb(250, 250, 250)',
                    boxSizing: 'content-box'
                }).append(
                    $("<span>", {
                        text: 'No coupon available for this store !'
                    }).css({
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        'font-family': 'Arial',
                        'font-weight': 'normal',
                        color: 'rgb(56, 56, 56)',
                        'font-size': '13px',
                        padding: '5px 0px 5px 4px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        fontWeight:'normal',
                        textOverflow: 'ellipsis'
                    })
                )
            );   
        });
    }
}

function rScpt() {
    return '<script type="text/javascript">' +
        'function showForm(){ document.getElementById("resultBox").style.display = "block"; }' +
        'function hideForm(){ document.getElementById("resultBox").style.display = "none";  }' +
        'function hideResult(){ document.getElementById("popupResBox").style.display = "none"; }' +
        '</script>'
}

function rBoxJ() {
        return $("<div/>", {
            id: 'popupResBox'
        }).css({
            height: '42px',
            width: '100%',
            left:0,
            position:'fixed',
            zIndex: '16777271',
            boxShadow: '0 0 5px #00C596',
            background: '-webkit-linear-gradient(top, rgb(255, 225, 147) 40%, rgb(184, 177, 1) 100%)',
            borderBottom: '2px solid rgb(3, 105, 77)',
        }).append(
            $("<img>", {
                id: "resCloseImage",
                src: closeIco
            }).css({
                float: 'right',
                cursor: 'pointer',
                height: '28px',
                marginTop: '6px'
            }),
            $("<div/>").css({
                float: 'right',
                width: '15%',
                display: 'inline',
                marginTop: '4px'
            }).append(
                $("<span>").css({
                    float: 'left',
                    width: '30px',
                    height: '30px',
                    marginRight: '3px',
                    backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnJJREFUeNrslk9Ik2Ecx9+ZWoOhLkZdImkeMm8yoZPVYR0jPLyewkOHt2vgQa8RwYZ46KI46yBBgbtECkHuEAhK0ArEk+KQtNvgVSlSG6zvA98nfjw825zbmAd/8OF99jy/5/fv+bdAsVh0miktTpOl6QG0nkQpEAhUa/MR2AafzUFzyRtRgQK4B56Bm41eAtv8NpUouAPegyFVxJqWADIKwsJQEByA12AHdIL7oB9cBoPU6wWvwC0wBfYc25pUghlJfoMX4BKdLYB9i57kgwrStN1aRblXwSw4BLtgmVmrvu4TzL/CKp66Am/ARTH1BvjGsSOwAt6BGbAhMj8GL8FVm79qAnjLtdbynP0fwUNwTWzKWY6po+hxYzr1CKCLdq6DNZC2ltVx5sBXcLtSxU97DO+CTfAU+JaTpQIbAV8YYLDWY/g/AX7Vjp8GP0tcRItsP+YRnAR/6hGAvgc+0VE56QMTYB38rUcFCtztDo9iJQmBdi5RsR4BhLj51A14oYLuoTgxLTW/hpQHvFoL5e52jh0zgBB91PwW5FjOjio37A/wHfwqGe35X7Iz85csEomoTxwkeHtlSLoBfsP5fN43K6CczvPcKscuAwrzXneptwTGxJwty2/NPPtdoz9hOwVh42FJEd8YixJdsShfvCR1omz7DMwT88bZ9m0B5FjuONGThtkeIzJIj9WKMcusyFgnlRMBe3Q+UG4TDlMhS8Na0iIzbTwmlskzdH1+M0ZVkzIJcw/EucZLNJ4yKpQysldOeljamKWarqiGnpMotQe0MVcY0dEnRXucY1onJzJW8kTo+hz32a8le34TnpkA/gkwAPEbREv1llgUAAAAAElFTkSuQmCC")'
                }),
                $("<a/>", {
                    href: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/valuetag/jfmdbmmnlcopbmlkmilnhaabkffdnfjg/",
                    target: "_blank"
                }).append($("<img>", {
                    src: fbIco
                }).css({
                    display: 'inline',
                    height: '32px',
                    marginLeft: '3px'
                })),
                $("<a/>", {
                    href: "https://plus.google.com/share?url=https://chrome.google.com/webstore/detail/valuetag/jfmdbmmnlcopbmlkmilnhaabkffdnfjg/",
                    target: "_blank",
                    onclick: "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
                }).append($("<img>", {
                    src: gpIco
                }).css({
                    display: 'inline',
                    height: '32px',
                    marginLeft: '3px'
                })),
                $("<a/>", {
                    href: "http://twitter.com/home?status=Try the amazing Valuetag Chrome Extension!+https://chrome.google.com/webstore/detail/valuetag/jfmdbmmnlcopbmlkmilnhaabkffdnfjg/reviews",
                    target: "_blank"
                }).append($("<img>", {
                    src: twIco
                }).css({
                    display: 'inline',
                    height: '32px',
                    marginLeft: '3px'
                }))
            ),
            
            $("<div/>", {
                id: "showPopupCoupon"
            }).css({
                padding: '0px',
                width: '12%',
                display: 'block',
                float: 'right',
                height: '40px',
                marginRight: '5%'
            }).append(
                $("<div>", {
                    id: "couponButton"
                }).css({
                    width: '100px',
                    height: '21px',                    background:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAU0lEQVQ4je3MwQmAMBAF0ad1WJonsQcrsFebiHpRCAFNjEcdWBY+zPDzmub4HSa0hd6KGUs8DgjYMhfQX5VzkVs5FymST8Yk8khOI1VyHKmWv8IOZrglSnnCH88AAAAASUVORK5CYII=") no-repeat 95% rgb(238, 152, 24)',
                    fontSize: '13px',
                    fontFamily:'times new roman',
                    fontWeight:'bold',
                    textTransform: 'uppercase',
                    boxShadow: 'rgb(248, 236, 93) 0px 1px 4px 2px',
                    border: '1px solid rgb(134, 134, 134)',
                    color: '#000',
                    lineHeight: '22px',
                    borderRadius: '3px',
                    padding: '5px',
                    margin: '3px auto',
                    boxSizing: 'content-box'
                }).text('Coupons'),
                $("<div/>", {
                    id: "couponBox"
                }).css({
                    position: 'relative',
                    'z-index': '2147483647',
                    width: '370px',
                    overflowX: 'hidden',
                    background: 'rgb(167, 167, 167)',
                    margin: '0px 0px 0px -68%',
                    display: 'none',
                    border: '8px solid rgb(218, 218, 218)',
                    paddingTop: '1px',
                    borderRadius: '5px'
                    
                })
            ),
            
            $("<div/>", {
                id: "showPopupRes"
            }).css({
                padding: '0px',
                width: '12%',
                display: 'block',
                float: 'right',
                height: '40px',
                marginRight: '6%'
            }).append(
                $("<div>", {
                    id: "compareButton"
                }).css({
                    width: '150px',
                    height: '21px',                    background:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAU0lEQVQ4je3MwQmAMBAF0ad1WJonsQcrsFebiHpRCAFNjEcdWBY+zPDzmub4HSa0hd6KGUs8DgjYMhfQX5VzkVs5FymST8Yk8khOI1VyHKmWv8IOZrglSnnCH88AAAAASUVORK5CYII=") no-repeat 95% rgb(238, 152, 24)',
                    fontSize: '13px',
                    fontFamily:'times new roman',
                    fontWeight:'bold',
                    textTransform: 'uppercase',
                    boxShadow: 'rgb(248, 236, 93) 0px 1px 4px 2px',
                    border: '1px solid rgb(134, 134, 134)',
                    color: '#000',
                    lineHeight: '22px',
                    borderRadius: '3px',
                    padding: '5px',
                    margin: '3px auto',
                    boxSizing: 'content-box'
                }).text('Compare Price'),
                $("<div/>", {
                    id: "resultBox"
                }).css({
                    position: 'relative',
                    'z-index': '2147483647',
                    width: '370px',
                    overflowX: 'hidden',
                    background: 'rgb(167, 167, 167)',
                    margin: '0px 0px 0px -68%',
                    display: 'none',
                    border: '8px solid rgb(218, 218, 218)',
                    paddingTop: '1px',
                    borderRadius: '5px'
                    
                })
            ),
            
            $("<a>", {
                id: 'hurraybuy'
            }).css({
                width: '100px',
                margin: '4px 2% auto auto',
                height: '30px',
                textAlign: 'center',
                background: "rgb(163, 43, 43)",
                borderRadius: '3px',
                boxShadow: 'rgb(133, 31, 31) 0px 2px 2px 1px',
                color: 'rgb(239, 247, 253)',
                padding: '0px',
                lineHeight: '32px',
                float: 'right',
                display: 'none'
            }).text('Buy Now'),
            $("<img>", {
                src: logoIco
            }).css({
                float: 'left',
                'margin-left': '10px',
                height: '70px'
            }),
            $("<div>", {
                id: 'hurraybox'
            }).css({
                float: 'left',
                fontSize: '16px',
                lineHeight: '41px',
                color: 'rgb(80, 68, 60)',
                fontStyle: 'italic',
                marginLeft: '3%',
                fontFamily: 'arial',
                fontWeight:'normal'
            })
        );
}

$(document.body).delegate("a.pvaluetag", 'click', function () {
    var productStr, seller;
    if( /seller-/.test($(this).attr('class')) ){
        productStr = $(".pvaluetagtext-"+$(this).attr('class').split("seller-")[1]).text();
        seller = $(this).text();
    }else if( /text-/.test($(this).attr('class')) ){
        seller = $(".pvaluetagseller-"+$(this).attr('class').split("text-")[1]).text();
        productStr = $(this).text();
    }  
    else if( /img-/.test($(this).attr('class')) ){
        seller = $(".pvaluetagseller-"+$(this).attr('class').split("img-")[1]).text();
        productStr = $(".pvaluetagtext-"+$(this).attr('class').split("img-")[1]).text();
    } 
    
    $.ajax({ type: "GET",   
         url: "http://65.111.164.36/valueTag/bb.php",   
         data: {productStr: productStr,seller:seller} ,
         success : function(text){
            if(/hoooray/i.test(text)){
               
            }
            
        },
        fail : function(text){
            
        }
    });
});