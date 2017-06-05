/*!
 * 常用方法
 * 吴正全
 * zennqann@foxmail.com
 * 2017-03-28
 */


import {
    Toast
} from 'mint-ui'

export default {
    setSession(key, val) {
        localStorage.setItem(key, val);
    },
    getSession(key) {
        return localStorage.getItem(key);
    },
    vuerifyCheck: function (vm, arr) {

        if (!vm.$vuerify.check(arr)) {
            for (var i in vm.$vuerify.$errors) {
                if (typeof vm.$vuerify.$errors[i] === 'string') {
                    Toast(vm.$vuerify.$errors[i])
                } else {
                    Toast(vm.$vuerify.$errors[i][0])
                }
                break;
            }
            return false;
        } else return true;
    },
    setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    //s20是代表20秒 
    //h是指小时，如12小时则是：h12 
    //d是天数，30天则：d30 
    setCookie2Time(name, value, time) {
        var strsec = this.getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getsec(str) {
        alert(str);
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        } else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    curDateTime() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }
}