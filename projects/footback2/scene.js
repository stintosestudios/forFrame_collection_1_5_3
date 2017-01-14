
/*

drawData = backgroundData({

    percent : this.percentDone,

    source : {
        tw : 1500, // total width, and height.
        th : 500,
        vw : 500, // view width, and height
        vh : 500
    },

    drawTo : {
        tw : 300,
        th : 100,
        vw : 100,
        vh : 100
    }

});

 */

var backgroundData = function (state) {

    var sx,
    draws = [];

    // find source x pointer, and scaled version
    sx = (state.source.tw - state.source.vw) - state.source.tw * state.percent;
    x = sx * (state.drawTo.tw / state.source.tw);

    // if sx is greater then 0, then we only need one ctx.drawImage call
    if (sx > 0) {

        // just part 1
        draws.push({

            sx : sx,
            sy : 0,
            sw : state.source.vw,
            sh : state.source.vh,

            dx : 0,
            dy : 0,
            dw : state.drawTo.vw,
            dh : state.drawTo.vh

        });

    } else {

        // else we need two draw operations

        // part 1
        draws.push({

            sx : 0,
            sy : 0,
            sw : state.source.vw + sx,
            sh : state.source.vh,

            dx : Math.abs(x),
            dy : 0,
            dw : state.drawTo.vw + x,
            dh : state.drawTo.vh

        });

        // part 2
        draws.push({

            sx : state.source.tw + sx,
            sy : 0,
            sw : Math.abs(sx),
            sh : state.source.vh,

            dx : 0,
            dy : 0,
            dw : Math.abs(x),
            dh : state.drawTo.vh

        });

    };

    return draws;

};

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
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [

        // background view
        {
            id : 'background_view',
            w : 480,
            h : 360,
            x : 0,
            y : 0,

            forFrame : function (pt) {},

            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part,

                    drawData = backgroundData({

                            percent : this.percentDone,

                            source : {
                                tw : 1500, // total width, and height.
                                th : 500,
                                vw : 500, // view width, and height
                                vh : 500
                            },

                            drawTo : {
                                tw : pt.w * 3,
                                th : pt.h,
                                vw : pt.w,
                                vh : pt.h
                            }

                        }),

                    self = this;

                    drawData.forEach(function (draw) {

                        ctx.drawImage(self.img[1],

                            draw.sx,
                            draw.sy,
                            draw.sw,
                            draw.sh,

                            draw.dx,
                            draw.dy,
                            draw.dw,
                            draw.dh);

                    });

                }

            }
        }, {

            id : 'feet',
            w : 200,
            h : 200,
            x : 0,
            y : 120,
            forFrame : function (pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5;

                pt.x = 240 - pt.w / 2 - 20 + 40 * bias;

                pt.radian = Math.PI * 2 - Math.PI * 2 * this.percentDone;
            },
            skin : {

                imgIndex : 2,
                sw : 500,
                sh : 500

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
        '../mylogo_128.png',
        'img/footBackground2.png',
        'img/feet4.png'
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
