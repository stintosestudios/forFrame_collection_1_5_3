
scene({

    maxFrame : 50,

    viewPort : {

        w : 480,
        h : 360

    },

    logo : {
        w : 128,
        h : 56,
        opacity : .4,
        skin : {
            imgIndex : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [{
            id : 'theline',
            w : 480,
            h : 360,
            skin : {
                appendRender : function (ctx) {

                    var totalPoints = 50,

                    getPoint = function (i) {

                        var bias = Math.abs(.5 - this.percentDone) / .5;

                        return {

                            x : this.viewPort.w / totalPoints * i,
                            y : this.viewPort.h - Math.pow(1.115, i) - (2 * i)

                        }
                    },

                    drawLine = function () {

                        var i = 0,
                        point;

                        ctx.save();
                        while (i < totalPoints) {

                            ctx.strokeStyle = 'rgba(255,255,255,.5)';
                            ctx.beginPath();
                            point = getPoint.call(this, i - 1);
                            ctx.moveTo(point.x, point.y);

                            point = getPoint.call(this, i);
                            ctx.lineTo(point.x, point.y);
                            ctx.stroke();

                            i += 1;

                        }
                        ctx.restore();

                    },

                    drawBox = function () {

                        var i = Math.floor(totalPoints) * this.percentDone,
                        point = getPoint.call(this, i),
                        angle = Math.atan2(point.y, point.x);

                        // draw box
                        ctx.save();
                        ctx.strokeStyle = '#00ffff';
                        ctx.lineWidth = 3;
                        ctx.translate(point.x - 64, point.y - 64);
                        ctx.rotate(angle);
                        ctx.strokeRect(0, 0, 128, 128);
                        ctx.restore();

                    };

                    drawLine.call(this);
                    drawBox.call(this);

                }
            }
        }

    ],

    // define the forFrame movement
    forFrame : function () {}

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        '../mylogo_128.png'
    ],
    function (progress) {

    // uncomment to save as png
    if (progress === 1) {

        var playback = {

            appendRender : function (ctx) {},
            appendZ : 0,

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);

    }

});
