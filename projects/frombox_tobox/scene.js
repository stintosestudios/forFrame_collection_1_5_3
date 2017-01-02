
scene({

    maxFrame : 100,

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
            id : 'the_area',
            w : 480,
            h : 360,

            skin : {
                appendRender : function (ctx) {

                    var fromBox = {},
                    toBox = {},
                    angle,
                    sizePart,
                    size,
                    index = 0,
                    opacity = 1,
                    startRadian,
                    offset = {

                        x : 240,
                        y : -150

                    },
                    level = -1;
                    while (level < 3) {

                        index = level + this.percentDone;

                        var startOpacity = 1 - 1 / 4 * (level + 1);

                        opacity = startOpacity - 1 / 4 * this.percentDone;

                        startRadian = .785;

                        //from box
                        size = 128 + 128 * index;
                        toBox.w = size;
                        toBox.h = size;
                        toBox.radian = startRadian +  - .785 * index;
                        toBox.x = offset.x;
                        toBox.y = offset.y + this.viewPort.h - size + (size * index);

                        // to box
                        angle = startRadian + 4.71 + .785 - .785 * index,
                        sizePart = toBox.w / 4,
                        size = sizePart + sizePart * 3 / 2 * index;
                        fromBox.radian = startRadian + .785 - .785 * index;
                        fromBox.w = size;
                        fromBox.h = size;
                        fromBox.x = Math.cos(angle) * (toBox.w / 2) + toBox.x;
                        fromBox.y = Math.sin(angle) * (toBox.h / 2) + toBox.y;

                        // draw
                        ctx.globalAlpha = opacity;
                        ctx.fillStyle = '#00ffff';

                        // draw to box
                        ctx.save();
                        ctx.translate(toBox.x, toBox.y);

                        ctx.rotate(toBox.radian);
                        ctx.fillRect(-toBox.w / 2, -toBox.h / 2, toBox.w, toBox.h);
                        ctx.restore();

                        // draw from box
                        ctx.save();
                        ctx.translate(fromBox.x, fromBox.y);
                        ctx.rotate(fromBox.radian);
                        ctx.fillRect(-fromBox.w / 2, -fromBox.h / 2, fromBox.w, fromBox.h);
                        ctx.restore();

                        level += 1;

                    }

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
