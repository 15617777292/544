$(document).ready(function () {
    
    
    $('footer').load('../html/footer.html',function () {
        
    })



    var arrs;
    $.ajax({
        type:'get',
        url:'../data/json.json',
        success:function (data) {
            arrs = data['phone'].concat(data['redphone'],data['tv']);
            var str = `<div class="cartListTitle"><span class="allCheck"><i class="checkBox">&#xe72e;</i>全选</span><span>商品名称</span><span>单价</span><span>数量</span><span>小计</span><span>操作</span></div>`;
            $(".cartList").append(str);
            var obj = $.cookie($.cookie('user'));
            obj = JSON.parse(obj);
            let count = 0;
            for (var key in obj){
                count=count+arrs[key-1]['price']*obj[key];
                let str1 = `<div class="cartPro" data-id="${key}"><span class="checkBox"><i class="iconfont">&#xe72e;</i></span><img src="${arrs[parseInt(key)-1]['url']}" alt=""><span class="proName">${arrs[parseInt(key)-1]['name']}</span><span class="price">${arrs[parseInt(key)-1]['price']}</span><input type="number" class="number" value="${obj[key]}"><span class="proPrice">${arrs[parseInt(key)-1]['price']*obj[key]}</span><span class="close iconfont">&#xe62b;</span></div>`;
                $(".cartList").append(str1)
            }

            var foot = `<div class="carTotal"><button>去结算</button><span class="totalPrice">合计：<b>0</b>元</span></div>`
            $(".cartList").append(foot);
        }
    });
    $("span.user").html($.cookie('user'));


    $(document).ajaxComplete(function () {
        //选择
        $(".allCheck i").click(function () {
            console.log(1);
            $(this).toggleClass('checked');
            $(".cartPro i").attr('class', $(this).attr('class'));
            //结算按钮是否能够点击.
            if ($(".cartPro i.checked").length > 0) {
                $(".cartTotal button").attr('class', 'selectBtn')
            } else {
                $(".cartTotal button").attr('class', '')
            }

            //总钱数:
            var totalMoney = 0;
            console.log($(".cartPro").length);

            for (var i = 0; i < $(".cartPro i.checked").length; i++) {
                totalMoney = totalMoney + parseInt($(".cartPro i.checked").eq(i).parent().siblings('.proPrice').html())

            }
            $(".totalPrice b").html(totalMoney)


        })
    })

















});