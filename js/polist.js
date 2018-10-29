$(document).ready(function () {
    var arrs;
    $.ajax({
        type: "get",
        url: '../data/json.json',
        success: function (data) {
            arrs = data['phone'].concat(data['redphone'], data['tv']);
        }
    });





    $(".nav").load("header.html", function () {
        if ( $.cookie('user') && $.cookie('user') != "") {
            $(".right>li:first>a").html($.cookie("user"));
            $(".right>li:first").addClass("user").mouseenter(function () {
                $(this).find("ul").slideDown(200);
            }).mouseleave(function () {
                $(this).find("ul").slideUp(100)
            }).find("ul").children().eq(0).click(function () {
                $.cookie("user","",{expires:1,path:'/'});
                location.reload();
            });

            //cartLoad()
            var light = cartLoad();
            if (light) {
                $(".cartLi").css({'background': '#FF6700'}).children('a').css({
                    'color': 'white',
                    'border':'none'
                });
                $(".cartLi").click(function () {
                    location.href="shop.html"
                })
            }
        }
        $(".right>li.cartLi").mouseenter(function () {
            $(".cart").stop().slideDown(300);
        }).mouseleave(function () {
            $(".cart").stop().slideUp(300);
        })
        //加载购物车事件;
        //...
    });











    $(".navList").load("nav_inp.html", function () {
        $("#home").click(function () {
            location.href="../index.html";
        });
        $("ul.pro").mouseover(function () {
            var datas;
            $.ajax({
                type: "get",
                url: "../data/json.json",
                success: function (data) {
                    datas = data;
                }
            });
            $(".proListw").slideDown(500);
            $("ul.pro li").mouseover(function () {
                var attr = $(this).attr("class");
                $(".proList").html("");
                var arr = datas[attr];
                for (let i = 0; i < arr.length; i++) {
                    var str = "";
                    if (arr[i]["hot"]) {
                        str = `<li><div class=\"li-header\"><span>新品</span></div><div class=\"li-img\" style=\"background-image: url('${arr[i]['url']}')\"></div><p class=\"name\">${arr[i]['name']}</p><p class=\"price\">${arr[i]['price']}元起</p></li>`
                        $(".proList").append(str);
                    }
                    else {
                        str = `<li><div class=\"li-header\"></div><div class=\"li-img\" style=\"background-image: url('${arr[i]['url']}')\"></div><p class=\"name\">${arr[i]['name']}</p><p class=\"price\">${arr[i]['price']}元起</p></li>`;
                        $(".proList").append(str);
                    }
                }
            })
        });

        $("ul.pro").mouseleave(function () {
            $(".proListw").slideUp(500);
        });

    });
    $("footer").load("footer.html", function () {
        //尾部js
    });

    var mySwiper2 = new Swiper('#proSwiper', {
        autoplay: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',

    });

    //列表
    $.ajax({
        type: 'get',
        url: '../data/json.json',
        success: function (data) {
            var arr = data['phone'];
            arr = arr.concat(data['redphone'], data['tv']);
            console.log(arr);
            for (let i = 0; i < 3; i++) {
                var str = `<div class="phoneList"><span class="id">${arr[i]['id']}</span>
                <img src="${arr[i]['src']}" alt=""><p class="telName">${arr[i]['name']}</p><p class="miaosu">全球首款双频GPS，骁龙845</p><span class="price">${arr[i]['price']}元起</span><span class="oldprice">${arr[i]['price'] + 100}元</span><a href="detail.html" class="iconfont">了解一下 &#xe637;</a></div>
                `;
                $("section:first").append(str);
            }
            for (let i = 3; i < 7; i++) {
                var str = ` <div class="phoneList2"><span class="id">${arr[i]['id']}</span>
 <img src="${arr[i]['src']}" alt=""><p class="telName">${arr[i]['name']}</p><p>小屏高性能的双摄手机</p><span class="oldprice">${parseInt(arr[i]['price']) + 100}元</span><span class="price">${arr[i]['price']}元起</span></div>
                `;
                $("section:first").append(str);
            }
            var str1 = ` <div class="tvList"><span class="id">${arr[12]['id']}</span>
            <div class="img"><img src="${arr[12]['src']}" alt=""></div>
            <p class="tvName">${arr[12]['name']}</p>
            <p>高清液晶屏，第6代画质引擎</p>
            <span class="price">¥${arr[12]['price'] - 400}</span>
            <span class="oldprice">¥${arr[12]['price']}</span>
            <a class="button">立即购买</a>
        </div>`;
            $("section:nth-child(2)").append(str1);
            for (let i = 13; i < 17; i++) {
                var str = `<div class="tvList2"><span class="id">${arr[i]['id']}</span><div class="img"><img src="${arr[i]['src']}" alt=""></div><p class="tvName">${arr[i]['name']}</p><p class="miaosu">高清液晶屏，第6代画质引擎</p><div class="span"><span class="oldprice">¥${arr[i]['price']}</span><span class="price">¥${arr[i]['price'] - 400}</span> <a class="button">立即购买</a>`;
                $("section:nth-child(2)").append(str);
            }
        }
    });
    $(document).ajaxComplete(function () {
            //ajax请求完成回调
            $(".tvList2,.tvList,.phoneList,.phoneList2").click(function () {
                    $.cookie.raw = true;
                    //var user = $.cookie("user");
                    $.cookie("pro",$(this).find(".id").html(),{expires:7,path:'/'});
                    location.href="detail.html";
                }
            )
        }
    )
//  购物车加载事件
    function cartLoad() {
        let uu = $.cookie('user');
        var num = 0;
        var count = 0;
        if ($.cookie(uu) && $.cookie(uu) != "") {
            $(".cart").html("");
            var dat = $.cookie(uu);
            console.log(dat);
            console.log(typeof dat);
            dat = JSON.parse(dat);
            for (var key in dat) {
                num = num + parseInt(dat[key]);
                count = count + parseInt(dat[key]) * arrs[parseInt(key) - 1]['price'];
                var str = `<div class="cartList"><img src="${arrs[parseInt(key) - 1]['url']}" alt=""><span class="proName">${arrs[parseInt(key) - 1]['name']}</span><span class="proPrice">${arrs[parseInt(key) - 1]['price']} x ${dat[key]}</span></div>`
                $(".cart").append(str);
            }
            var fot = `<div class="totalCart"><span class="totalPro">共${num}件商品</span><a href="cart.html">去购物车结算</a><span class="totalPrice">${count}元</span></div>`;
            $(".cart").append(fot);
            $(".cartLi").find('b').html(num);
            return true;
        }

    }

});