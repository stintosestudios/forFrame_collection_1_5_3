
scene({

    maxFrame : 60,

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

            id : 'background',
            w : 960,
            h : 360,
            forFrame : function (pt) {

			    pt.x = -240;
                pt.radian = Math.PI * 2 * this.percentDone;

            },
            skin : {

                imgIndex : 2,
                sw : 2048,
                sh : 2048

            }

        }, {

            id : 'head2',

            forFrame : function (pt) {

                pt.w = 175 + 175 * this.percentDone;
                pt.h = 175 + 175 * this.percentDone;
                pt.x = this.viewPort.w / 2 - pt.w / 2;
                //pt.y = this.viewPort.h - pt.h - 200 + 200 * this.percentDone;

                pt.y = this.viewPort.h - pt.h;
                //pt.y -= 200 -200 * this.percentDone;
            },

            skin : {

                imgIndex : 1,
                sw : 250,
                sh : 250,

                appendRender : function (ctx, skin) {

                    //ctx.strokeStyle = '#ff0000';
                    //ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

                }

            }

        }, {

            id : 'head1',

            forFrame : function (pt) {

                pt.w = 350 + 350 * this.percentDone;
                pt.h = 350 + 350 * this.percentDone;
                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h - pt.h + pt.h * this.percentDone;

            },

            skin : {

                imgIndex : 1,
                sw : 250,
                sh : 250,

                appendRender : function (ctx, skin) {

                    //ctx.strokeStyle = '#ff0000';
                    //ctx.strokeRect(0, 0, skin.part.w, skin.part.h);

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
        '../mylogo_128.png',
        'img/home_alone_9.png',
        'img/spiral.jpg'
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
