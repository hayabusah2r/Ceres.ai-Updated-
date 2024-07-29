document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailData = {
        sender: { email: from },
        to: [{ email: to }],
        subject: subject,
        htmlContent: message
    };

    fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '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' // Replace with your Sendinblue API key
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.messageId) {
            alert('Email sent successfully!');
        } else {
            throw new Error('Error: ' + JSON.stringify(data));
        }
    })
    .catch(error => {
        alert('Failed to send email. ' + error);
    });
});