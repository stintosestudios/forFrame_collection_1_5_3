
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

                    var x,
                    y,
                    point,
                    i = 0,
                    totalPoints = 50,
                    angle; // the angle for the given point

                    var getPoint = function (i) {

                        var bias = Math.abs(.5 - this.percentDone) / .5;

                        return {

                            x : this.viewPort.w / totalPoints * i,
                            y : this.viewPort.h - Math.pow(1.115, i) - (3 * i)

                        }
                    };

                    i = Math.floor(totalPoints) * this.percentDone;
                    point = getPoint.call(this, i);
                    angle = Math.atan2(point.y, point.x);

                    // draw
                    ctx.save();
                    ctx.strokeStyle = '#00ffff';
                    ctx.translate(point.x - 64, point.y - 64);
                    ctx.rotate(angle);
                    ctx.strokeRect(0, 0, 128, 128);
                    ctx.restore();

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
