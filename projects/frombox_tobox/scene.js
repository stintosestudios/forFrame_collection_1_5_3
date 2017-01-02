
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

                    var fromRadian = 1,

                    fromBox = {
                        w : 64,
                        h : 64,
                        x : 0,
                        y : 0,
                        radian : 1
                    },

                    toBox = {
                        w : 128,
                        h : 128,
                        x : 200,
                        y : 0,
                        radian : 0
                    },
                    angle,
                    sizePart,
                    size,
                    offset = {

                        x : 200,
                        y : -100

                    }

                    size = 128 + 128 * this.percentDone;
                    toBox.w = size;
                    toBox.h = size;
                    toBox.radian =  - .785 * this.percentDone;
                    toBox.x = offset.x;
                    toBox.y = offset.y + this.viewPort.h - size + (size * this.percentDone);

                    angle = 4.71 + .785 - .785 * this.percentDone,
                    sizePart = toBox.w / 4,
                    size = sizePart + sizePart * 3 / 2 * this.percentDone;

                    fromBox.radian = .785 - .785 * this.percentDone;
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
