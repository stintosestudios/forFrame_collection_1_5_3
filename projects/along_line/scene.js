
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
                            //y : this.viewPort.h - Math.pow(1.127, i)

                            y : this.viewPort.h - Math.pow(1 + bias * .4, i)

                        }
                    };

                    //ctx.strokeRect(0, 0, 32, 32);

                    // ctx.moveTo(0, this.viewPort.h);
                    while (i < totalPoints) {

                        // draw line segment

                        ctx.strokeStyle = '#00ffff';
                        ctx.beginPath();
                        point = getPoint.call(this, i - 1);
                        ctx.moveTo(point.x, point.y);

                        point = getPoint.call(this, i);
                        ctx.lineTo(point.x, point.y);
                        ctx.stroke();

                        ctx.strokeStyle = '#00ffff';
                        angle = Math.atan2(point.y, point.x);

                        x = Math.cos(angle) * 100 + point.x;
                        y = Math.sin(angle) * 100 + point.y;

                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(x, y);
                        ctx.stroke();

                        i += 1;

                    }

                    //ctx.stroke();

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
