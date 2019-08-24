window.onload = function () {

    // Initial Settings
    shortcut(0);

    // Side Buttons
    var position = 0;
    $(".rightbtn").on("click", function () {
        if (position >= 0 && position < 2) {
            $('.pos' + position).css('left', '-100%');
            $('.pos' + (position + 1)).css('left', '0%');
            position++;
            btnChange(position);
        }
    });

    $(".leftbtn").on("click", function () {
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

        // Change Right Button
        if (position < 2) {
            txtChange(arr[0], arr2[0], true, position + 1, 'right');
        } else {
            txtChange(arr[0], arr2[0], false, position + 1, 'right');
        }

        // Change Left Button
        if (position > 0) {
            txtChange(arr[1], arr2[1], true, position - 1, 'left');
        } else {
            txtChange(arr[1], arr2[1], false, position - 1, 'left');
        }
        $('.button').css('color', 'white');
        var btn = "#" + $('.pos' + position).attr("id") + "btn";
        $(btn).css('color', 'rgba(0, 200, 200, 1)');

        if (position == 0) {
            var x = document.getElementById("about").offsetWidth * 2;
            $("#jsXP").empty();
            $("#cssXP").empty();
            $("#htmlXP").empty();
            renderBar(x / 3, "jsXP");
            renderBar(x / 4, "cssXP");
            renderBar(x / 5, "htmlXP");
        }
        else{
            $("#jsXP").empty();
            $("#cssXP").empty();
            $("#htmlXP").empty();
            renderBar(1, "jsXP");
            renderBar(1, "cssXP");
            renderBar(1, "htmlXP");
        }

    }

    function txtChange(name, attr, check, position, dir) {
        var arrow = "<";
        if (dir == 'right') {
            arrow = ">"
        }

        if (check == true) {
            $(name).css(attr, '-100%');
            $("." + dir + "Arrow").css(attr, '-100%');
            speed = speed * 2;
            setTimeout(function () {
                $(name).text($('.pos' + (position)).attr('data'));
                $("." + dir + "Arrow").text(arrow);
                $(name).css(attr, '0%');
                $("." + dir + "Arrow").css(attr, '0%');
                speed = speed / 2;
            }, 500);
        } else {
            $(name).css(attr, '-100%');
            $("." + dir + "Arrow").css(attr, '-100%');
            setTimeout(function () {
                $(name).text('');
                $("." + dir + "Arrow").text('');
                $(name).css(attr, '0%');
                $("." + dir + "Arrow").css(attr, '0%');
            }, 500);
        }

    }

    ///////////////STAT BARS///////////////////
    // var x = document.getElementById("about").offsetWidth * 2;
    // renderBar(x / 3, "jsXP");
    // renderBar(x / 4, "cssXP");
    // renderBar(x / 5, "htmlXP");

    function renderBar(max, element) {
        var test = document.getElementById(element);
        console.log(test);
        var canvas2 = document.createElement('canvas');
        test.appendChild(canvas2);
        var canvasCtx2 = canvas2.getContext("2d");
        canvas2.width = document.getElementById("about").offsetWidth - 50;
        canvas2.height = document.getElementById("bar").offsetHeight - 20;
        var height2 = canvas2.height;
        var width2 = canvas2.width;
        var barMin = 10;
        var barLength = barMin;
        console.log(element + " -- Width: " + width2 + " Height: " + height2);

        var color = canvasCtx2.createLinearGradient(width2, 0, 0, 0);
        color.addColorStop(0, "rgba(" + 0 + "," + 100 + "," + 255 + "," + 0 + ")");
        color.addColorStop(1, "rgba(" + 0 + "," + 100 + "," + 255 + "," + .2 + ")");
        canvasCtx2.fillStyle = color;

        grow();

        function grow() {
            requestAnimationFrame(grow);
            if (barLength <= max && barLength < width2 - 10) {
                canvasCtx2.fillRect(0, 0, barLength, height2);
                barLength += max / 50;
            }
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
    console.log("RAIN BG -- Width: " + width + " Height: " + height);

    // Rain Drop Variables
    var drops = width / 50;
    var r = 0;
    var g = 255;
    var b = 255;
    var a = 0.2;
    var speed = 20;
    var dropLength = height / 10;
    var dropLengthMin = height / 100;
    var dropWidth = 2;
    var gradient = canvasCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(" + r + "," + g + "," + b + "," + 0 + ")");
    gradient.addColorStop(.3, "rgba(" + r + "," + g + "," + b + "," + a + ")");
    gradient.addColorStop(1, "rgba(" + r + "," + g + "," + b + "," + 0.1 + ")");
    canvasCtx.fillStyle = gradient;

    // Store drops
    var dropArr = []
    for (var i = 0; i < drops; i++) {
        dropArr.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: dropLength
        })
    }

    renderDrop();
    // Render Drops
    function renderDrop() {
        requestAnimationFrame(renderDrop);
        canvasCtx.clearRect(0, 0, width, height);
        for (var i = 0; i < dropArr.length; i++) {
            canvasCtx.fillRect(dropArr[i].x, dropArr[i].y, dropWidth, dropArr[i].l);
        }
        moveDrop();
    }

    function moveDrop() {
        for (var i = 0; i < dropArr.length; i++) {
            // speed = height / (Math.random() * 50 + 50);
            dropArr[i].y += speed;
            if (dropArr[i].l > dropLengthMin) {
                if (dropArr[i].y > height / 5) {
                    dropArr[i].l -= dropLength / 50;
                }
            }
            if (dropArr[i].y > height) {
                dropArr[i].l = dropLength;
                dropArr[i].y = Math.random() * height - height;
                dropArr[i].x = Math.random() * width;
            }
        }

    }
    ////////////// RAIN BG END ////////////////////
}