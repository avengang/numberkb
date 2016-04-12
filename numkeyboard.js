/**
 * Created by zWX325482 on 2016/1/21.
 */
function NumKeyboard() {}
NumKeyboard.prototype = {
    inputObj: null,
    init: function(config) {

        if(this.inputObj) {
            this.inputObj.readOnly = true;
        }

        if(!this.html) {

            var html = '<section name="_numkeyboard_" class="numkeyboard_box" id="numKeyboard">' +
                            '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_close_delete" style="float: none;">x</div>' +
                            '<di name="_numkeyboard_"v class="numkeyboard_button_box">' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">1</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">2</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">3</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">4</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">5</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">6</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">7</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">8</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">9</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number" id="numkeyboard_point">.</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_number">0</div>' +
                                '<div name="_numkeyboard_" class="numkeyboard_item numkeyboard_close_delete" style="width: 33.3%;">←</div>' +
                                '<div name="_numkeyboard_" class="clearfl"></div>'+
                            '</div>' +
                        '</section>';
            var div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);
            this.div = document.getElementById("numKeyboard");
            this.div.style.display = "none";
            var items = document.getElementsByClassName("numkeyboard_item");

            for(var i=0;i<items.length;i++) {

                if(items[i].innerHTML == "x") {
                    continue;
                }
                items[i].addEventListener('click', this.input.bind(this));
            }
            var del = document.getElementsByClassName("numkeyboard_close_delete")[0];
            del.addEventListener('click', this.hide.bind(this));

            var me = this;

            document.body.addEventListener("click", function(e) {

                setTimeout(function() {//事件延迟

                    if(!me.isShow) {//当数字键盘显示出来才执行否则不管
                        return;
                    }

                    if(!me.inputObj) {
                        return;
                    }

                    if(e.target == me.inputObj) {//点的需要弹出数字键盘的元素
                        return;
                    }
                    //
                    //if(window.numKeyboard_click_listener)
                    //    clearTimeout(window.numKeyboard_click_listener);

                    if(e.target.getAttribute("name") != '_numkeyboard_') {
                        me.hide(me);
                    }
                }, 350);
            });
        }

        this.isShow = false;
    },

    show: function(config) {

        var inputObj = event.target;
        var needPoint = config.needPoint;
        this.hideFn = config.hideFn;
        this.inputObj = inputObj;
        this.needPoint = needPoint;
        this.isShow = true;

        if(!needPoint) {

            document.getElementById("numkeyboard_point").style.backgroundColor = "lightgray";
        }
        this.div.style.display = "block";
        var itemHeight = document.getElementsByClassName("numkeyboard_item")[0].offsetHeight;
        var items = document.getElementsByClassName("numkeyboard_number");
        for(var i=0;i<items.length;i++) {
            items[i].style.lineHeight = itemHeight+"px";
            items[i].style.height = itemHeight+"px";
        }
        var items = document.getElementsByClassName("numkeyboard_item");
        for(var i=0;i<items.length;i++) {
            items[i].style.lineHeight = itemHeight+"px";
            items[i].style.height = itemHeight+"px";
        }
    },

    hide: function(me) {

        if(!me) {
            me = this;
        } else {

            if(me.y) {//表示是事件
                me = this;
            }
        }

        var meNode = document.getElementById('numKeyboard');
        if(!meNode) {
            return;
        }
        meNode.style.display = 'none';
        me.hideFn && me.hideFn(me.inputObj.value);
        me.isShow = false;
    },

    input: function() {

        var val = window.event.target.innerHTML;

        if(val == '←') {
            this.inputObj.value = this.inputObj.value.substring(0, this.inputObj.value.length-1);
        } else {

            if(val == '.') {

                if(this.needPoint) {
                    this.inputObj.value += val;
                }
            } else {
                this.inputObj.value += val;
            }
        }
    }
}
var numKeyboard = new NumKeyboard();
numKeyboard.init();