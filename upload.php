<?php
	$name = urldecode($_SERVER['HTTP_X_FILE_NAME']);
	if ($name) {
	    file_put_contents(
	        'uploads/' . $name,
	        file_get_contents('php://input')
	    );
	    echo "uploads/$name";
	    exit();
	}
 ?>