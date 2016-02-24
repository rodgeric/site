<!doctype html>
<html class="no-js" lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="no">
    <meta name="mobile-web-app-capable" content="no">
    <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/fullPage/jquery.fullPage.css">
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" href="css/main.css">

    <script src="js/modernizr-custom.js"></script>
</head>
<body>
<div id="preload"></div>
<div id="fullpage">
	<div class="section one" id="section1">
	</div>
	<div class="section two" id="section2">
		<div class="slider">
			<ul id="stack_krisna" class="stack stack--krisna comments">
				<?php include 'ig_file.php' ;?>
			</ul>
			<div class="controls">
				<button class="button button--sonar button--reject" data-stack="stack_krisna"><i class="fa fa-times"></i><span class="text-hidden">Reject</span></button>
				<button class="button button--sonar button--accept" data-stack="stack_krisna"><i class="fa fa-check"></i><span class="text-hidden">Accept</span></button>
			</div>
		</div>
	</div>
    <div class="section one" id="section3">
    </div>
</div>


	
	<script src="js/libs/jquery/jquery.js"></script>


	
	<script src="js/libs/fullpage/jquery.fullPage.min.js"></script>
    <script src="js/dynamics.min.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/slider.js"></script>
	<script src="js/main.js"></script>




</body>
</html>