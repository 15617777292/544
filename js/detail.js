$(function () {
    var arrs;
    $.ajax({
        type: "get",
        url: '../data/json.json',
        success: function (data) {
            arrs = data['phone'].concat(data['redphone'], data['tv']);
            console.log(arrs);
        }
    });

    $(".nav").load('header.html', function () {
        if ($.cookie('user') && $.cookie('user') != '') {
            $(".right>li:first>a").html($.cookie('user'));
            $(".right>li:first").addClass('user').mouseenter(function () {
                $(this).find('ul').slideDown(200);
            }).mouseleave(function () {
                $(this).find('ul').slideUp(100)
            }).find("ul").children().eq(0).click(function () {
                $.cookie('user', '', {expires: 1, path: '/'});
                location.reload()
            })
            var light = cartLoad();
            if (light) {
                $(".cartLi").css({'background': '#FF6700'}).children('a').css({
                    'color': 'white',
                    "border": 'none'
                })
                $('.cartLi').click(function () {
                    location.href = 'shop.html'
                })
            }
        }
        $(".right>li.cartLi").mouseenter(function () {
            $('.cart').stop().slideDown(300);
        }).mouseleave(function () {
            $(".cart").stop().slideUp(300);
        })
    });


    $('.navList').load('../html/nav_inp.html', function () {
        $("ul.pro").mouseover(function () {
            var datas;
            $.ajax({
                type: 'get',
                url: '../data/json.json',
                success: function (data) {
                    datas = data;
                }
            })
            $('.proListw').slideDown(500);
            $("ul.pro li").mouseover(function () {
                var attr = $(this).attr('class');
                $(".proList").html("");
                var arr = datas[attr];
                for (let i = 0; i < arr.length; i++) {
                    var str = '';
                    if (arr[i]['hot']) {
                        str = `<li><div class=\"li-header\"><span>新品</span></div><div class=\"li-img\" style=\"background-image: url('${arr[i]['url']}')\"></div><p class=\"name\">${arr[i]['name']}</p><p class=\"price\">${arr[i]['price']}元起</p></li>`;
                        $('.proList').append(str);
                    } else {
                        str = `<li><div class=\"li-header\"></div><div class=\"li-img\" style=\"background-image: url('${arr[i]['url']}')\"></div><p class=\"name\">${arr[i]['name']}</p><p class=\"price\">${arr[i]['price']}元起</p></li>`;
                        $('.proList').append(str);
                    }
                }
            })
        })
        $("ul.pro").mouseleave(function () {
            $(".proListw").slideUp(500);
        })
    });


    var mySwiper = new Swiper("#detailSwiper", {
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });


    var id = $.cookie('pro');
    var obj = {};
    $.ajax({
        type: 'get',
        url: '../data/json.json',
        success: function (data) {
            var arr = data['phone'].concat(data['redphone'], data['tv']);
            obj = arr[id - 1];
        }
    });

    $(document).ajaxComplete(function () {
        $(".proName").html(obj['name']);
        $(".price").html(obj['price'] + "元");
        $(".oldprice").html(obj['price'] - 100 + "元");
        $("#detailSwiper img").attr("src", obj['src']);
        $(document).scroll(function () {
            $(document).scrollTop() > 200 ? $("#fly").slideDown(300) : $("#fly").slideUp(500);
            if ($(document).scrollTop() > 200 && $(document).scrollTop() < 400) {
                $("#detailSwiper").css('top', $(document).scrollTop() - 200 + 60)
            } else if ($(document).scrollTop() > 440) {
                $("#detailSwiper").css('top', 240)
            } else {
                $("#detailSwiper").css('top', 60)
            }
        })
        $(".color").click(function () {
            $(this).addClass('select').siblings('.color').removeClass("select");

        });

    });


    $("#buy").click(function () {
        if ($.cookie('user') && $.cookie('user') != "") {
            $.cookie.raw = true;
            var uu = $.cookie('user');
            let pro = $.cookie('pro');
            if ($.cookie(uu) && $.cookie(uu) != "") {
                console.log(1);
                console.log($.cookie(uu));
                var obj = $.cookie(uu);
                obj = JSON.parse(obj);
                var flag = false;
                for (var key in obj) {
                    if (pro == key) {
                        obj[key] = parseInt(obj[key]) + 1;
                        flag = true;
                    }
                }
                if (flag) {
                    obj = JSON.stringify(obj);
                    console.log(obj);
                    $.cookie.raw = true;
                    $.cookie(uu, obj, {expires: 7, path: '/'});
                    cartLoad();
                } else {
                    var newObj = {[pro]: 1};
                    obj = JSON.stringify(obj) + JSON.stringify(newObj);
                    obj = obj.replace("}{", ",");
                    $.cookie.raw = true;
                    $.cookie(uu, obj, {expires: 7, path: '/'});
                    cartLoad();
                }
            } else {
                var newObj = {[pro]: 1};
                newObj = JSON.stringify(newObj);
                $.cookie(uu, newObj, {expires: 7, path: '/'});
                cartLoad();

            }
            alert("添加购物车成功");
        } else {
            var con = confirm("您还没有登录呢,要登录吗?");
            if (con == true) {
                location.href = 'enter.html';
            } else {
                location.reload();
            }
        }
    });

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
            var fot = `<div class="totalCart"><span class="totalPro">共${num}件商品</span><a href="shop.html">去购物车结算</a><span class="totalPrice">${count}元</span></div>`;
            $(".cart").append(fot);
            $(".cartLi").find('b').html(num);
            return true;
        }

    }


    $('footer').load('footer.html', function () {
        //脚部引入公共页面footer
    })
});
