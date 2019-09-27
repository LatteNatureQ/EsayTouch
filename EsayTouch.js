!(function (w) {
    w.EsayTouch = {
        touchstart: function (el, fn) {
            el.addEventListener('touchstart', function (e) {
                var e = e || event
                fn(e)
            })
        },
        touchend: function (el, fn) {
            el.addEventListener('touchend', function (e) {
                var e = e || event
                fn(e)
            })
        },
        touchmove: function (el, fn) {
            el.addEventListener('touchmove', function (e) {
                var e = e || event
                fn(e)
            })
        },
        touchcancel: function (el, fn) {
            el.addEventListener('touchcancel', function (e) {
                var e = e || event
                fn(e)
            })
        },
        touchstart: function (el, fn) {
            el.addEventListener('touchStart', function (e) {
                var e = e || event
                fn(e)
            })
        },
        // 移动端tap事件
        tap: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY
            // 怎么封装比较好?
            // 在部分设备上,对touch事件比较灵敏,导致触摸开始和触摸结束坐标之间存在偏差
            el.addEventListener('touchstart', function (e) {
                var e = e || event
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
            })
            el.addEventListener('touchend', function (e) {
                var e = e || event
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (Math.abs(touchEndX - touchStartX) < 10 && Math.abs(touchEndY - touchStartY) < 10) {
                    fn({
                        target: e.target,
                        type: 'tap',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }
            })
        },
        // 长按事件
        longTap: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY, lTapTimer = null
            // 在水平方向或者是垂直方向上，移动的距离 任意一个大于10，我们就不再认为是长按了，这里我们就清除定时器
            // 长按事件一般750ms去执行
            el.addEventListener('touchstart', function (e) {
                if (lTapTimer) {
                    clearTimeout(lTapTimer)
                    lTapTimer = null
                }
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
                lTapTimer = setTimeout(function () {
                    fn({
                        target: e.target,
                        type: 'longTap',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }, 750)
            })
            el.addEventListener('touchmove', function (e) {
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (Math.abs(touchEndX - touchStartX) >= 10 || Math.abs(touchEndY - touchStartY) >= 10) {
                    clearInterval(lTapTimer)
                }
            })
            el.addEventListener('touchend', function (e) {
                if (lTapTimer) {
                    clearTimeout(lTapTimer)
                    lTapTimer = null
                }
            })
        },
        // 左滑动事件
        swiperLeft: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY
            el.addEventListener('touchstart', function () {
                var e = e || event
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
            })
            el.addEventListener('touchmove', function (e) {
                var e = e || event
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (touchEndX - touchStartX < 0 && Math.abs(touchEndY - touchStartY) < 5) {
                    fn({
                        target: e.target,
                        type: 'swiperLeft',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }
            })
        },
        // 右滑动事件
        swiperRight: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY
            el.addEventListener('touchstart', function () {
                var e = e || event
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
            })
            el.addEventListener('touchmove', function (e) {
                var e = e || event
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (touchEndX - touchStartX > 0 && Math.abs(touchEndY - touchStartY) < 5) {
                    fn({
                        target: e.target,
                        type: 'swiperRight',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }
            })
        },
        // 上滑动事件
        swiperTop: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY
            el.addEventListener('touchstart', function () {
                var e = e || event
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
            })
            el.addEventListener('touchmove', function (e) {
                var e = e || event
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (touchEndY - touchStartY < 0 && Math.abs(touchEndX - touchStartX) < 5) {
                    fn({
                        target: e.target,
                        type: 'swiperTop',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }
            })
        },
        // 下滑动事件
        swiperBottom: function (el, fn) {
            var touchStartX, touchStartY, touchEndX, touchEndY
            el.addEventListener('touchstart', function () {
                var e = e || event
                touchStartX = e.changedTouches[0].pageX
                touchStartY = e.changedTouches[0].pageY
            })
            el.addEventListener('touchmove', function (e) {
                var e = e || event
                touchEndX = e.changedTouches[0].pageX
                touchEndY = e.changedTouches[0].pageY
                if (touchEndY - touchStartY > 0 && Math.abs(touchEndX - touchStartX) < 5) {
                    fn({
                        target: e.target,
                        type: 'swiperBottom',
                        touches: e.changedTouches,
                        targetTouches: e.targetTouches
                    })
                }
            })
        }
    }
})(window)