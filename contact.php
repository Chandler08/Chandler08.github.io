<?php
/**
 * Obsługa formularza kontaktowego Ambito Plus
 */

// Ustawienia
$recipient_email = "biuro@ambitoplus.pl"; // Zmień na docelowy email firmy, np. biuro@ambitoplus.pl
$subject_prefix = "Nowa wiadomość ze strony: ";

// Nagłówki dla odpowiedzi JSON
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobranie i oczyszczenie danych
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));

    // Walidacja
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Proszę poprawnie wypełnić wszystkie wymagane pola."]);
        exit;
    }

    // Budowanie treści wiadomości
    $email_content = "Imię i nazwisko: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Telefon: $phone\n\n";
    $email_content .= "Wiadomość:\n$message\n";

    // Budowanie nagłówków email
    $email_headers = "From: Ambito Plus Website <noreply@ambitoplus.pl>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    $full_subject = $subject_prefix . $name;

    // Wysyłka
    if (mail($recipient_email, $full_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Dziękujemy! Twoja wiadomość została wysłana."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Przepraszamy, wystąpił błąd serwera. Prosimy o kontakt telefoniczny."]);
    }

} else {
    // Nieobsługiwana metoda
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Wystąpił problem z Twoim zgłoszeniem, spróbuj ponownie."]);
}
?>