const accessKeyTemplate = (ACCESS_KEY) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    line-height: 1.6;
                }
                .access-key {
                    font-weight: bold;
                    color: #d9534f;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hello,</h1>
                <p>
                    We're excited to share that your access key has been generated successfully.
                </p>
                <p>
                    Here is your access key:
                </p>
                <p class="access-key">
                    ${ACCESS_KEY}
                </p>
                <p>
                    Please keep this key secure and do not share it with anyone.
                </p>
                <p>
                    Best regards,<br>
                    MailService
                </p>
            </div>
            <div class="footer">
                &copy; 2025 MailService. All rights reserved.
            </div>
        </body>
        </html>
    `;
}

module.exports = accessKeyTemplate;