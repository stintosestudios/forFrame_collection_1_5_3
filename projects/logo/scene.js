

scene({

    maxFrame : 60,

    viewPort : {

        w : 480,
        h : 360

    },

    logo : {
        w : 128,
        h : 56,
        x : 512,
        y : 424,
        opacity : .5,
        skin : {
            imgIndex : 0,
            sw : 128,
            sh : 56
        }
    },

    sections : {

        timeline : 'main:25;hold:75;main:100;',

        forFrame : {

            main : function () {

                var pt = this.parts['logobox'];

                var per = this.sectionPer / 2;

                if (this.sectionIndex === 2) {

                    per = 0.5 + this.sectionPer * 0.5;

                }

                pt.x = -pt.w + (this.viewPort.w + pt.w) - (this.viewPort.w + pt.w) * per;
                pt.y = -pt.h + (this.viewPort.h + pt.h) - (this.viewPort.h + pt.h) * per;

                pt.opacity = 1 - Math.abs(.5 - this.percentDone) / .5;

            },

            hold : function () {

                var pt = this.parts['logobox'];

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2;
                pt.opacity = 1;
            }

        }

    },

    // define some parts
    parts : [{
            id : 'logobox',
            w : 400,
            h : 150,
            skin : {

                appendRender : function (ctx, skin) {

                    var pt = skin.part,
                    fontSize = 50;

                    ctx.fillStyle = 'rgba(0,255,255,0.1)';
                    ctx.fillRect(0, 0, pt.w, pt.h);
                    ctx.strokeStyle = 'rgba(0,255,255,0.5)';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(0, pt.h);
                    ctx.lineTo(0, 0);
                    ctx.lineTo(pt.w, 0);
                    ctx.stroke();
                    ctx.fillStyle = '#00ffff';
                    ctx.font = fontSize + 'px arial';
                    ctx.textBaseline = 'top';
                    ctx.textAlign = 'center';
                    ctx.fillText('forFrame.js', pt.w / 2, pt.h / 2 - fontSize / 2);

                }

            }
        }
    ],

    forFrame : function () {

        this.currentSection();

    }

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

//scene.injectUI({containerId:'apparea'});


scene.load(
    [
        '../mylogo_128.png',
        'img/logo.png'
    ],
    function (progress) {

    if (progress === 1) {

        scene.injectUI({

            appendRender : function (ctx) {

                //ctx.fillStyle = '#ffffff';
                //ctx.fillRect(0, 0, this.viewPort.w, this.viewPort.h);

            },

            containerId : 'apparea'

        });

    }

});
