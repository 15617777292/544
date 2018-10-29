;(function () {
    $(document).ready(function () {
        var arrs;
        var datas;
        $.ajax({
            type: "get",
            url: 'data/json.json',
            success: function (data) {
                datas = data;
                arrs = data['phone'].concat(data['redphone'], data['tv']);
                console.log(arrs);
            }
        });
        $(document).ajaxComplete(function () {

            if ($.cookie('user') && $.cookie('user') != "") {
                $(".right>li:first>a").html($.cookie("user"));
                $(".right>li:first").addClass("user").mouseenter(function () {
                    $(this).find("ul").slideDown(200);
                }).mouseleave(function () {
                    $(this).find("ul").slideUp(100)
                }).find("ul").children().eq(0).click(function () {
                    $.cookie.raw = true;
                    $.cookie("user", "", {expires: -1, path: '/'});
                    location.reload();
                })


                var light = cartLoad();
                if (light) {
                    $(".cartLi").css({'background': '#FF6700'}).children('a').css({
                        'color': 'white',
                        'border': 'none'
                    });
                    $(".cartLi").click(function () {
                        location.href = "html/shop.html"
                    })
                }

            }
            $(".right>li.cartLi").mouseenter(function () {
                $(".cart").stop().slideDown(300);
            }).mouseleave(function () {
                $(".cart").stop().slideUp(300);
            })

            $("ul.pro").mouseover(function () {
                $(".proListw").stop().slideDown(500);

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

            //左边列表
            $(".slide-list").mouseenter(function () {
                var arr;
                $.ajax({
                    type: "get",
                    url: "data/json.json",
                    success: function (data) {
                        arr = data["phone"].concat(data["redphone"], data["tv"], data["phone"]);
                        console.log(arr);
                    }
                })
                $(".slide-list ul li").mouseenter(function () {
                    var idx = $(this).index();
                    $(".total-w").html("");
                    var star = 0;
                    var len = arr.length;
                    if (idx > 0) {
                        star = parseInt(Math.random() * len);
                        //len = parseInt(Math.random() * (len - star) + star)
                    }
                    $(".total-w").css("width", 247 * (Math.floor((len - star - 1) / 6) + 1));
                    $(".totalL").show()
                    for (let i = star; i < len; i++) {
                        var str = "";
                        str = `<div class="total-p" style="background-image: url('${arr[i]['url']}')"><p class="totalName-p">${arr[i]['name']}</p></div>`;
                        $(".total-w").append(str);
                    }
                });
            });

            //cartLoad
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
                    var fot = `<div class="totalCart"><span class="totalPro">共${num}件商品</span><a href="html/shop.html">去购物车结算</a><span class="totalPrice">${count}元</span></div>`;
                    $(".cart").append(fot);
                    $(".cartLi").find('b').html(num);
                    return true;
                }

            }

        });

        $("ul.pro").mouseleave(function () {
            $(".proListw").stop().slideUp(500);
        });
        //轮播图
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,
            effect: 'fade',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })

        //左边列表出现效果

        $(".slide").mouseleave(function () {
            //var flag=true;
            $(".totalL").hide();
            $(".totalL").mouseenter(function () {
                $(".totalL").mouseleave(function () {
                    $(".totalL").hide();
                })
            })
        });


    });
})()
;