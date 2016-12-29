

scene({

    maxFrame : 100,

    logo : {
        w : 128,
        h : 56,
        x : 512,
        y : 424,
        skin : {
            imgIndex : 3,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [{
            id : 'background',
            w : 640,
            h : 480,

            skin : {

                imgIndex : 2,
                sw : 640,
                sh : 480

            }

        }, {
            id : 'floor',
            w : 640,
            h : 600,
            skin : {

                appendRender : function (ctx) {

                    var x = (640*2) - 1920 * this.percentDone,

                    sx = 1000 - 1500 * this.percentDone;

                    if (sx > 0) {

                        ctx.drawImage(this.img[4],
                            sx, 0, 500, 500,
                            0, 0, 640, 600);

                    } else {

                        ctx.drawImage(this.img[4],
                            0,
                            0,
                            500 + sx,
                            500,

                            Math.abs(x),
                            0,
                            640 + x,
                            600);

                        ctx.drawImage(this.img[4],

                            1500 + sx,
                            0,
                            Math.abs(sx),
                            500,

                            0,
                            0,
                            Math.abs(x),
                            600);
                             

                    }

                }

            }
        }, 
		
		{
            id : 'footarea',
            w : 128,
            h : 256,

            skin : {

                imgIndex : 0,
                sw : 93,
                sh : 85,
				xOffset : -50,
				yOffset : -30

            }

        }, {
            id : 'headarea',
            w : 280,
            h : 280,

            skin : {

                imgIndex : 1,
                sx : 0,
                sy : 0,
                sw : 128,
                sh : 128,
				xOffset: -64

            }

        }
		
		/*
		{
            id : 'footarea',
            w : 64,
            h : 128,

            skin : {

                imgIndex : 0,
                sw : 93,
                sh : 85

            }

        }, {
            id : 'headarea',
            w : 128,
            h : 128,

            skin : {

                imgIndex : 1,
                sx : 0,
                sy : 0,
                sw : 128,
                sh : 128,

            }

        }
		
		*/

    ],

    sections : {

        timeline : 'back:10;hold:60;forward:100',

        forFrame : {

            back : function () {

                var pt = this.parts['footarea'],
                radian = 0.5 - 1.5 * this.sectionPer;

                pt.x = -32 + 320;
                pt.y = -64 + 240;
                //pt.y = 280 - 104 * this.sectionPer;
                pt.radian = radian;

                //pt.skin.renderPartBox = true;

                //pt.skin.xOffset = -20;
                //pt.skin.yOffset = -20;

                pt = this.parts['floor'];
                //pt.y = 280 - 80 * this.sectionPer;
                pt.y = -100 - 20 * this.sectionPer;

                pt = this.parts['headarea'];
                pt.radian = 0.2 + 0.4 * this.sectionPer;

                //pt.y = 280 - 104 * this.sectionPer;

                return radian;

            },

            hold : function () {

                var pt = this.parts['footarea'],

                radian = -1;

                pt.x = -32 + 320;
                pt.y = -64 + 240;

                pt.radian = radian;

                //pt.skin.renderPartBox = true;

                pt = this.parts['floor'];
                //pt.y = 200 + 1000 * this.sectionPer;

                pt.y = -120 + 480 * this.sectionPer;

                pt = this.parts['headarea'];

                pt.radian = 0.6;

                return radian;

            },

            forward : function () {

                var pt = this.parts['footarea'],
                radian = -1 + 1.5 * this.sectionPer;

                pt.x = -32 + 320;
                pt.y = -64 + 240;
                pt.radian = radian;
                //pt.skin.renderPartBox = true;

                pt = this.parts['floor'];
                //pt.y = 480 - (400 * this.sectionPer);
                //pt.y = 680 - 400 * this.sectionPer;

                pt.y = -120 + 480 - 480 * this.sectionPer;

                pt = this.parts['headarea'];
                pt.radian = 0.4 - 0.4 * this.sectionPer + 0.2;

                return radian;

            }

        }

    },

    // define the forFrame movement
    forFrame : function () {

        var radian,
        pt;

        radian = this.currentSection();

        // the head always moves with the current radian from the current section method.
        pt = this.parts['headarea'];

        pt.x = (320 - 48) + Math.sin(Math.PI - radian) * 80;
        pt.y = (240 - 48) + Math.cos(Math.PI - radian) * 80;

        pt = this.parts['background'];

        var d = 1280, // distance
        dH = d / 2, // half distnace
        log,
        x;

        log = Math.log(1 + (1 - (this.percentDone / 0.5))) / Math.log(2);
        x = dH * log;

        if (this.percentDone >= 0.5) {

            log = Math.log(2 - (1 - ((this.percentDone - 0.5) / 0.5)) * 1) / Math.log(2);
            x = dH + (dH - (log * dH));

        }

        pt.skin.sx = x;
        pt.skin.sy = 160 * log;

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        'img/foot.png',
        'img/pathead.png',
        'img/background2.png',
        '../mylogo_128.png',
        'img/footBackground2.png'
    ],
    function (progress) {

    // uncomment to save as png
    if (progress === 1) {

        var playback = {
            appendRender : function (ctx) {

                ctx.fillStyle = '#555555';
                ctx.fillRect(0, 0, 640, 480);

            },
            appendZ : 0,

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);

    }

});
