
var backgroundData = function(options){
	
	
	
};


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
            w : 375,
            h : 125,
            x : 50,
            y : 50,

            forFrame : function (pt) {},

            skin : {

                imgIndex : 1,
                sx : 0,
                sy : 0,
                sw : 1500,
                sh : 500,
                appendRender : function (ctx) {

                    var pointerX = 250 - 375 * this.percentDone;
                    var pointerSX = 1000 - 1500 * this.percentDone;

                    if (pointerX > 0) {

                        // part 1
                        ctx.fillStyle = 'rgba(0,255,0,.4)';
                        ctx.lineWidth = 3;
                        ctx.fillRect(pointerX, 0, 125, 125);

                        ctx.drawImage(this.img[1], pointerSX, 0, 500, 500, 0, 145, 125, 125);
                        ctx.fillRect(0, 145, 125, 125);

                    } else {

                        // part 1
                        ctx.fillStyle = 'rgba(0,255,0,.4)';
                        ctx.lineWidth = 3;
                        ctx.fillRect(0, 0, 125 + pointerX, 125);

                        ctx.drawImage(this.img[1],
                            0,
                            0,
                            500 + pointerSX,
                            500,
                            Math.abs(pointerX),
                            145,
                            125 + pointerX,
                            125);

                        ctx.fillRect(0 + Math.abs(pointerX), 145, 125 + pointerX, 125);

                        // part 2
                        ctx.fillStyle = 'rgba(255,0,0,.4)';
                        ctx.lineWidth = 3;
                        ctx.fillRect(375 + pointerX, 0, Math.abs(pointerX), 125);

                        ctx.drawImage(this.img[1],

                            1500 + pointerSX,
                            0,
                            Math.abs(pointerSX),
                            500,

                            0,
                            145,
                            Math.abs(pointerX),
                            125);

                        ctx.fillRect(0, 145, Math.abs(pointerX), 125);

                    }

                }

            }
        }, {

            id : 'feet',
            w : 125,
            h : 125,
            x : 300,
            y : 50 + 125 + 20,
            forFrame : function (pt) {

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
