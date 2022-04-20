<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
            <meta content="width=device-width, initial-scale=1.0" name="viewport">
                <!-- <link rel="stylesheet" href="../assets/css/style.css"> -->
                <link href="../assets/css/GroupProject4.css" rel="stylesheet" title="style" type="text/css"/>
                <script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" type="module"></script>
                </script>
                <title>
                    YU Navigation Map
                </title>

                
            </meta>
        </meta>
    </head>
    <center>
        <body>
            <h2>
                York University Navigation Map
                <br>
                <br>
                <img height="250px" src="../assets/GPLogo.png" width="250px"/>                   
            </h2>
        </body>
    </center>
    <img height="368px" src="../assets/qrCode/YU-N.Mqr-code.png" width="368px"/>
    <h3 id="into">
        Brief description of our project
    </h3>
    <p>
        The goal of our project is to create an easy to use tool for new students and people unfamiliar with the campus. Using geolocation, we will have unique 3D of models of buildings appear in AR along bits of helpful information such as the building name and its operational hours. Cycling though the diffent kinds of information is easy, just tap the screen. To access our project, just click the buttom at the bottom of the page. Also, if you find this application useful, share it with others using our custom QR code above!
    </p>
    <!-- <p>The AR link in the website can guide students to get the route and building through GPS.</p> -->
    <body>

    	<model-viewer src="../assets/models/LassondeBuilding.glb" camera-controls disable-zoom camera-orbit="305deg 90deg 2.5m" auto-rotate ios-src="assets/models/LassondeBuilding.usdz"> </model-viewer>
        <h4>
            Click the button to open the AR web application
        </h4>
        <button id="ar" onclick="openTab('AR_GroupProject4.html')" type="button">
            <!-- Start AR -->
        </button>

        <hr>
        <h5>
            Creators
        </h5>
        <p class="authors">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="Zihan Cao" height="100px" width="100px" style="float: left; margin-left: 100px;">
            Zihan Cao 
        </p>
        
        <p class="authors">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="Yidan Zhang" height="100px" width="100px" style="float: left; margin-left: 100px;">
            Yidan Zhang
        </p>
        
        <p class="authors">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="Jason Lu" height="100px" width="100px" style="float: left; margin-left: 100px;">
            Jason Lu
        </p>

        <p class="authors">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="Jingheng Xu" height="100px" width="100px" style="float: left; margin-left: 100px;">
            Jingheng Xu
        </p>
        
        <p class="authors">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="Yuqing Guo" height="100px" width="100px" style="float: left; margin-left: 100px;">
            Yuqing Guo
        </p>
        <img class="imgRight" height="300px" src="../assets/qrCode/pattern-logo.png" width="300px"/>
        <script>
            function openTab(url) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        </script>
        <a-marker preset="logo">
        </a-marker>
        <a-marker type="pattern" url="path/to/pattern-YU_pattern.patt">
        </a-marker>
    
    </body>
</html>

        
