window.onload = function () {

    // Initial Settings
    shortcut(0);

    // Side Buttons
    var position = 0;
    $("#rightbtn").on("click", function () {
        if (position >= 0 && position < 2) {
            $('.pos' + position).css('left', '-100%');
            $('.pos' + (position + 1)).css('left', '0%');
            position++;
            btnChange(position);
        }
    });

    $("#leftbtn").on("click", function () {
        if (position > 0 && position <= 2) {
            $('.pos' + position).css('left', '100%');
            $('.pos' + (position - 1)).css('left', '0%');
            position--;
            btnChange(position);
        }
    });

    //Top Bar Shortcuts
    $("#aboutbtn").on("click", function () {
        shortcut(0);
    });

    $("#portfoliobtn").on("click", function () {
        shortcut(1);
    });

    $("#contactbtn").on("click", function () {
        shortcut(2);
    });


    // Button Functions
    function shortcut(num) {
        $('.pos' + (num - 2)).css('left', '-100%');
        $('.pos' + (num - 1)).css('left', '-100%');
        $('.pos' + num).css('left', '0%');
        $('.pos' + (num + 1)).css('left', '100%');
        $('.pos' + (num + 2)).css('left', '100%');
        position = num;
        btnChange(position);
    }

    function btnChange(position) {
        var arr = ['#rightbtn', '#leftbtn'];
        var arr2 = ['right', 'left'];
        if (position < 2) {
            txtChange(arr[0], arr2[0], true, position + 1);
        } else {
            txtChange(arr[0], arr2[0], false, position + 1);
        }
        if (position > 0) {
            txtChange(arr[1], arr2[1], true, position - 1);
        } else {
            txtChange(arr[1], arr2[1], false, position - 1);
        }
        $('.button').css('color', 'white');
        var btn = "#" + $('.pos' + position).attr("id") + "btn";
        $(btn).css('color', 'rgba(0, 200, 200, 1)');
    }

    function txtChange(name, attr, check, position) {
        if (check == true) {
            $(name).css(attr, '-100%');
            speed = speed * 2;
            setTimeout(function () {
                $(name).text($('.pos' + (position)).attr('data'));
                $(name).css(attr, '0%');
                speed = speed / 2;
            }, 500);
        } else {
            $(name).css(attr, '-100%');
            setTimeout(function () {
                $(name).text('');
                $(name).css(attr, '0%');
            }, 500);
        }

    }

    ////////////// RAIN BG ////////////////////
    // Canvas Variables
    var canvas = document.getElementById("rainBG");
    var canvasCtx = canvas.getContext("2d");
    canvas.width = document.getElementById("gridContainer").offsetWidth;
    canvas.height = document.getElementById("gridContainer").offsetHeight;
    var height = canvas.height;
    var width = canvas.width;
    console.log("Width: " + canvas.width + " Height: " + canvas.height);

    // Rain Drop Variables
    var drops = width / 50;
    var r = 0;
    var g = 255;
    var b = 255;
    var a = 0.3;
    var speed = 20;
    var dropLength = height / 10;
    var dropWidth = 2;
    var gradient = canvasCtx.createLinearGradient(0, 0, 0, height + 5);
    gradient.addColorStop(0, "rgba(" + r + "," + g + "," + b + "," + 0 + ")");
    gradient.addColorStop(.3, "rgba(" + r + "," + g + "," + b + "," + a + ")");
    gradient.addColorStop(1, "rgba(" + r + "," + g + "," + b + "," + 0 + ")");
    canvasCtx.fillStyle = gradient;

    // Store drops
    var dropArr = []
    for (var i = 0; i < drops; i++) {
        dropArr.push({
            x: Math.random() * width,
            y: Math.random() * height
        })
    }

    renderDrop();
    // Render Drops
    function renderDrop() {
        requestAnimationFrame(renderDrop);
        canvasCtx.clearRect(0, 0, width, height);
        for (var i = 0; i < dropArr.length; i++) {
            canvasCtx.fillRect(dropArr[i].x, dropArr[i].y, dropWidth, dropLength);
        }
        moveDrop();
    }

    function moveDrop() {
        for (var i = 0; i < dropArr.length; i++) {
            // speed = height / (Math.random() * 50 + 50);
            dropArr[i].y += speed;
            if (dropArr[i].y > height) {
                dropArr[i].y = Math.random() * height - height;
                dropArr[i].x = Math.random() * width;
            }
        }

    }
    ////////////// RAIN BG END ////////////////////
}