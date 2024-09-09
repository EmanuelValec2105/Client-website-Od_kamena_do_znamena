<?php
// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $surname = strip_tags(trim($_POST["surname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($surname) OR empty($phone) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "valecluka8@gmail.com";

    // Set the email subject.
    $subject = "Upit sa stranice od $name $surname";

    // Build the email content.
    $email_content .= "$message\n\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Mobitel: $phone\n";

    // Build the email headers.
    $email_headers = "From: $recipient\n";
    $email_headers .= "Reply-To: $email";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Hvala vam! Vaša poruka je poslana :)";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Došlo je do pogreške, pokušajte ponovno!";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Došlo je greške kod slanja poruke, molimo Vas pokušajte ponovno!";
}
?>
