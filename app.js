// 用户名称 - 修改为自己的名称
var userName = 'Lu仔酱';
// 需要渲染的页面的数据
// 朋友圈页面的数据
var data = [{
    user: {
        name: '阳和',
        avatar: './img/avatar2.png'
    },
    content: {
        type: 0, // 多图片消息
        text: '华仔真棒，新的一年继续努力！',
        pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
        timeString: '3分钟前',
    },
    reply: {
        hasLiked: false,
        likes: ['Guo封面', '源小神'],
        comments: [{
            author: 'Guo封面',
            text: '你也喜欢华仔哈！！！'
        }, {
            author: '喵仔zsy',
            text: '华仔实至名归哈'
        }]
    }
    }, {
        user: {
            name: '伟科大人',
            avatar: './img/avatar3.png'
        },
        content: {
            type: 1, // 分享消息
            text: '全面读书日',
            pics: [],
            share: {
                pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
                text: '飘洋过海来看你'
            },
            timeString: '50分钟前',
        },
        reply: {
            hasLiked: false,
            likes: ['阳和'],
            comments: []
        }
    }, {
        user: {
            name: '深圳周润发',
            avatar: './img/avatar4.png'
        },
        content: {
            type: 2, // 单图片消息
            text: '很好的色彩',
            pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
            timeString: '一小时前',
        },
        reply: {
            hasLiked: false,
            likes: [],
            comments: []
        }
    }, {
        user: {
            name: '喵仔zsy',
            avatar: './img/avatar5.png'
        },
        content: {
            type: 3, // 无图片消息
            text: '以后咖啡豆不敢浪费了',
            pics: [],
            timeString: '2个小时前',
        },
        reply: {
            hasLiked: true,
            likes: ["Lu仔酱"],
            comments: []
        }
    }
];


// 页面元素
var $momentsList = $('.moments-list');

/**
 * 渲染函数：点赞列表
 * @param {Array} likes 点赞名称数组
 */
function likesHtmlTpl(likes) {
    if (!likes.length) {
        return '';
    }
    var htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
    if (likes.length) {
        htmlText.push(' <a class="reply-who" href="#">' + likes[0] + '</a>');
    }
    // 后面的前面都有逗号
    for (var i = 1, len = likes.length; i < len; i++) {
        htmlText.push('，<a class="reply-who" href="#">' + likes[i] + '</a>');
    }
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 渲染函数：评论内容
 * @param {Array} comments 评论信息对象数组
 */
function commentsHtmlTpl(comments) {
    if (!comments.length) {
        return '';
    }
    var htmlText = ['<div class="reply-comment">'];
    for (var i = 0, len = comments.length; i < len; i++) {
        var comment = comments[i];
        htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
    }
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 渲染函数：消息回复
 * @param {Array} comments 评论信息对象数组
 */
function replyTpl(replyData) {
    var htmlText = [];
    htmlText.push('<div class="reply-zone">');
    // 点赞模板
    htmlText.push(likesHtmlTpl(replyData.likes));
    // 评论模块
    htmlText.push(commentsHtmlTpl(replyData.comments));
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 渲染函数：多张图片
 */
function multiplePicTpl(pics) {
    var htmlText = [];
    htmlText.push('<ul class="item-pic">');
    for (var i = 0, len = pics.length; i < len; i++) {
        htmlText.push('<li class="pic-wrap"><img class="pic-item" src="' + pics[i] + '"></li>')
    }
    htmlText.push('</ul>');
    return htmlText.join('');
}
function multipleTextPicTpl(pics) {
    var htmlText = [];
    htmlText.push('<ul class="item-pic">');
    for (var i = 0, len = pics.length; i < len; i++) {
        htmlText.push('<li class="pic-wrap"><img class="pic-item" src="' + pics[i] + '"></li>')
    }
    htmlText.push('</ul>');
    return htmlText.join('');
}

/**
 * 循环：消息体
 * 生成的html文本可参考 message.html文件
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
    var user = messageData.user;
    var content = messageData.content;
    var htmlText = [];
    htmlText.push('<div class="moments-item" data-index="0">');
    // 消息用户头像 
    htmlText.push('<a class="item-left" href="#">');
    htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
    htmlText.push('</a>');
    // 消息右边内容
    htmlText.push('<div class="item-right">');
    // 消息内容-用户名称
    htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
    // 消息内容-文本信息
    htmlText.push('<p class="item-msg">' + content.text + '</p>');
    // 消息内容-图片列表 （目前只支持多图片消息，需要补充完成其余三种消息展示）
    /**
     * zhalice批阅   问题:对4种消息没有进行分类
     * 4种消息可以通过switch语句进行判断 在case中对每个不同的type进行分别处理
     var contentHtml = '';
    // 目前只支持多图片消息，需要补充完成其余三种消息展示
        switch(content.type) {
            // 多图片消息
            case 0:
                contentHtml = multiplePicTpl(content.pics);
                break;
            case 1:
            // TODO: 实现分享消息
                contentHtml = '<div class="share-msg">'+
                                    '<a href="#"><img src="' + content.share.pic + '">飘扬过来来看你</a>'+
                            '</div>'
                break;
            case 2:
            // TODO: 实现单张图片消息
                contentHtml = '<div class="siglepic-msg">'+
                                    '<img src="' + content.pics + '">'+
                            '</div>'
                break;
            case 3:
                break;
            // TODO: 实现无图片消息
        }
        htmlText.push(contentHtml);
    */
    htmlText.push(multiplePicTpl(content.pics));
    // 消息时间和回复按钮
    htmlText.push('<div class="item-ft">');
    htmlText.push('<span class="item-time">' + content.timeString + '</span>');
    htmlText.push('<div class="item-reply-btn">');
    htmlText.push('<span class="item-reply"></span>');
    htmlText.push('</div></div>');
    // 消息回复模块（点赞和评论）
    htmlText.push(replyTpl(messageData.reply));
    htmlText.push('</div>');
    return htmlText.join('');
}

/**
 * 页面渲染函数：render
 */
function render() {
    // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
    // var messageHtml = messageTpl(data[0]);
    //遍历，添加data数组中的所有消息数据；
    data.forEach(function (item) {
        $momentsList.append(messageTpl(item));
    })
}
/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
    // TODO: 完成页面交互功能
    var curlikelist = null;
    //toggle功能
    $.fn.toggle = function (fn, fn2) {
        var args = arguments, guid = fn.guid || $.guid++, i = 0,
            toggle = function (event) {
                var lastToggle = ( $._data(this, "lastToggle" + fn.guid) || 0 ) % i;
                $._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false;
            };
        toggle.guid = guid;
        while (i < args.length) {
            args[i++].guid = guid;
        }
        return this.click(toggle);
    };
    //添加点赞评论
    $('.item-reply-btn').before("<div class='item-reply-likelist'><span class='item-reply-likelist-like'>点赞</span><span class='item-reply-likelist-comment'>评论</span></div>");
    //添加评论栏
    $(".page-moments").append('<div class="moments-comment"><input type="text" class="moments-comment-input"><button class="moments-comment-button">评论</button></div>');
    //将点赞评论隐藏
    $(".item-reply-likelist").hide();
    //点击评论按钮出现 点赞/评论,且只显示一个
    $(".item-ft").on('click', '.item-reply-btn', function (e) {
        curlikelist = $(this).siblings(".item-reply-likelist");
        var index = curlikelist.index(".item-reply-likelist");
        //遍历隐藏不是当前选项的选项卡
        for (var i = 0, len = $(".item-reply-likelist").length; i < len; i++) {
            if (i != index) {
                $(".item-reply-likelist").eq(i).hide();
            }
        }
        curlikelist.animate({
            width: "toggle",
            height: "36px"
        }, 300)
        return false;
    })

    //点击评论按钮出现评论栏
    $(".item-ft").on('click', '.item-reply-likelist-comment', function () {
        $(this).parent(".item-reply-likelist").animate({
            width: "toggle",
            height: "36px"
        }, 300);
    });
    $(".item-ft").on('click', '.item-reply-likelist-like', function () {
    })
    //点赞toggle
    var a = '<i>，</i><a class="reply-who" href="#">' + userName + '</a>';
    $(".item-reply-likelist-like").toggle(function () {
            $(this).text("取消");
            //
            /**
            * zhalice批阅   
            
                问题1:没有对自己已经点过赞的进行判断
                解决:data里面有一个haslike=true表示自己已经是点赞的状态
                    可以在前期渲染的时候在<div class=="reply-zone" data-like="1"></div>
                    var haslike = $(this).parents('.item-right').find('.reply-zone').attr("data-like")
                    if(haslike=="1"){  //表示自己已经点赞
                        
                    }else{ //表示自己没有点赞

                    }
                问题2:下面的($(this).parents('.item-right')可以先缓存起来
            **/
            
            //如果有人赞过
            if ($(this).parents('.item-right').find('.reply-like').length == 1) {
                $(this)
                    .parents('.item-right')
                    .find('.reply-like')
                    .append(a);
            } else {
                //如果没人赞过
                $(this)
                    .parents('.item-right')
                    .find('.reply-zone')
                    .prepend('<div class="reply-like"><i class="icon-like-blue"></i> <a class="reply-who" href="#">' + userName + '</a>')
            }
            $(this).parent('.item-reply-likelist').animate({
                width: "toggle",
                height: "36px"
            }, 300);
        }, //取消点赞
        function () {
            $(this).text("点赞");
            //暂时用append和remove来模拟
            if ($(this).parents('.item-right').find('.reply-like').children("a").length == 1) {
                //如果只有自己点赞，将整个点赞节点删除
                $(this).parents('.item-right').find('.reply-like').remove();
            } else {
                //如果有其他人点赞，只删除自己的
                $(this).parents('.item-right').find('.reply-like')
                    .children("a:last-child").remove()
                    .children("i:last-child").remove();
                    
                /**
                * zhalice批阅   
                
                    问题1:实现点赞功能中的(点击取消按钮，取消点赞)有问题 使用find查找性能优化
                    解决:var $replyLike = $(this).parents('.item-right').find('.reply-like')
                         $replyLike.find("a:last-child").remove()
                         $replyLike.find("i:last-child").remove()
                **/
            }

            $(this).parent('.item-reply-likelist').animate({
                width: "toggle",
                height: "36px"
            }, 300);
        })
    //点击图片toggle
    var $windowW = $(".page-moments");
    //小图点击放大
    $(".item-right").on('click', '.pic-item', function () {
        $(this).parent(".pic-wrap")
            .addClass("item-pic-big")
            .css({
                width: $windowW.outerWidth() + "px",
                height: "100vh"
                //获取页面宽度
            })
        $(document.body).css({
            overflow: "hidden"
        });
        $(this).addClass("pic-mgpd");
    })
    //大图点击恢复
    $(".item-right").on('click', '.item-pic-big', function () {
        $(this)
            .removeClass("item-pic-big")
            .css({
                height: "90px",
                width: "90px"
            })
        $(document.body).css({
            overflow: "auto"
        });
        $(this).find(".pic-item").removeClass("pic-mgpd");
    })
    //评论功能实现
    $(".moments-comment").hide();
    $(".item-reply-likelist-comment").on('click', function (e) {
        $(".moments-comment").show();
        $(".moments-comment-input:eq(0)").focus();
        curlikelist.animate({
            width: "toggle",
            height: "36px"
        })
        e.stopPropagation();
    })
    //点击非输入框区隐藏输入框
    //点击其他部分 点赞/评论按钮隐藏
    $(window).on('click', function (e) {
        var target = e.target;
        $(".item-reply-likelist").hide();
        if (target.className != "moments-comment") {
            $('.moments-comment-input').val("");
            $(".moments-comment").hide();
        }
    });
    /**
     * zhalice批阅   
     *      问题1.:Dom元素使用变量进行缓存,不要重复写$("xxx"),既不美观也对性能有影响
     * 
     * 优化的办法: var commentBtn =  $('.moments-comment-button')
     * 
     *      问题2:对同一个Dom元素的不同操作可以用jq提供的链式方法写在一起
     * 
     * 优化的办法: commentBtn.attr("disabled",true)..css("background","#ccc")
    **/
    // 监听输入框改变
    $('.moments-comment-button').attr("disabled",true);
    $('.moments-comment-button').css(
        "background","#ccc"
    )
    $('.moments-comment-input').bind('input propertychange', function () {
        // 把字符串去掉空格，检查是否为空。
        $str = $.trim($('.moments-comment-input').val());
        if ($str === "") {
            //判断输入框是否为空
            $('.moments-comment-button').css("background", "#ccc");
            $('.moments-comment-button').attr("disabled", true);
        } else {
            $('.moments-comment-button').attr("disabled", false);
            $('.moments-comment-button').css("background", "#47b111");
        }
    });
//#47b111
    $(".moments-comment").on('click', "button", function () {
        var comment = curlikelist.parents(".moments-item").find(".reply-comment");
        //如果已经有评论，增加一条评论,且输入不能为空
        //若不为空，且已有评论
        if (comment.parents(".reply-zone").find(".comment-item").length > 0) {
            comment.append('<div class="comment-item"><a class="reply-who" href="#">' + userName + '</a>：' + $(".moments-comment-input").val() + '</div>')
        } else {
            //若不为空，但是没有评论
            curlikelist.parents(".moments-item").find('.reply-zone').append('<div class="reply-comment"><div class="comment-item"><a class="reply-who" href="#">' + userName + '</a>：' + $(".moments-comment-input").val() + '</div></div>')
        }
        ;
        //隐藏评论区，重置input button
        $(".moments-comment-input").val("");
        $(".moments-comment").hide();
        $('.moments-comment-button').attr("disabled", true);
        $('.moments-comment-button').css(
            "background", "#ccc"
        )

    })
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
    // 展现自己的名称
    $('.user-name').text(userName);
    render();
    bindEvent();
}
init();