<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$statusMessage = "";
$statusSuccess = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $company = htmlspecialchars($_POST['company']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $order_details = htmlspecialchars($_POST['order_details']);

    $subject = "Nowe zamowienie!";
    $message = "Imie i nazwisko: $name\n";
    $message .= "Firma: $company\n";
    $message .= "Telefon: $phone\n";
    $message .= "E-mail: $email\n";
    $message .= "Zamowienie:\n$order_details\n";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'kupczyk005@gmail.com';
        $mail->Password = 'yhxkgcrjabghnayd';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('kupczyk005@gmail.com');
        $mail->addAddress('biuro@ambitoplus.pl');

        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        $statusMessage = "Zamówienie zostało wysłane pomyślnie!";
        $statusSuccess = true;
    } catch (Exception $e) {
        $statusMessage = "Wystąpił problem podczas wysyłania zamówienia. Spróbuj ponownie później.";
    }
} else {
    $statusMessage = "Nieprawidłowe żądanie.";
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Zamówienia</title>
    <link rel="icon" href="./img/logo.png" type="image/icon type">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #74ebd5, #9face6);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: #fff;
            padding: 20px 40px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
        }
        h1 {
            font-size: 1.8em;
            margin-bottom: 10px;
        }
        p {
            font-size: 1em;
            color: #555;
            margin-bottom: 20px;
        }
        .success {
            color: #4CAF50;
        }
        .error {
            color: #f44336;
        }
        .button {
            text-decoration: none;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        .button:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="<?= $statusSuccess ? 'success' : 'error'; ?>">
            <?= $statusSuccess ? "✅ Sukces!" : "❌ Błąd!"; ?>
        </h1>
        <p><?= $statusMessage; ?></p>
        <a href="index.html" class="button">Wróć do strony głównej</a>
    </div>
</body>
</html>
