<?php
if(isset($_POST['message'])){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
    
	
	$to      = 'english-courses@ck.ua';
	$subject = 'From my Web Page';
	$headers = 'From: '. $email . "\r\n" .
    'Reply-To: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	$status = mail($to, $subject, $message, $headers);
	if($status == TRUE){	
		$res['sendstatus'] = 'done';
	
		//Edit your message here
		$res['message'] = $name . ', Your message sent!';
    }
	else{
		$res['message'] = $name . ', mail has not being sent. Please mail me to english-courses@ck.ua';
	}
	
	
	echo json_encode($res);
}
?>