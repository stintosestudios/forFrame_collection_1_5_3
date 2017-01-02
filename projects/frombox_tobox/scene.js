
scene({

    maxFrame : 25,

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
					startRadian,
                    offset = {

                        x : 240,
                        y : -150

                    },
                    level = -4;
                    while (level < 4) {

                        index = level + this.percentDone;

                        size = 128 + 128 * index;
                        
						startRadian = .785;
						
                        toBox.w = size;
                        toBox.h = size;
                        toBox.radian =  startRadian + -.785 * index;
                        toBox.x = offset.x;
                        toBox.y = offset.y + this.viewPort.h - size + (size * index);

                        angle = startRadian + 4.71 + .785 - .785 * index,
                        sizePart = toBox.w / 4,
                        size = sizePart + sizePart * 3 / 2 * index;

                        fromBox.radian = startRadian + .785 - .785 * index;
                        fromBox.w = size;
                        fromBox.h = size;
                        fromBox.x = Math.cos(angle) * (toBox.w / 2) + toBox.x;
                        fromBox.y = Math.sin(angle) * (toBox.h / 2) + toBox.y;

                        ctx.save();
                        ctx.translate(toBox.x, toBox.y);
                        ctx.rotate(toBox.radian);
                        ctx.strokeStyle = '#00ffff';
                        ctx.strokeRect(-toBox.w / 2, -toBox.h / 2, toBox.w, toBox.h);
                        ctx.restore();

                        ctx.save();
                        ctx.translate(fromBox.x, fromBox.y);
                        ctx.rotate(fromBox.radian);
                        ctx.strokeStyle = '#00ffff';
                        ctx.strokeRect(-fromBox.w / 2, -fromBox.h / 2, fromBox.w, fromBox.h);
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
