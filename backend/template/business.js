const businessTemplate = (subject,body)=>
{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 0;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom: 4px solid #0056b3;
            animation: slideIn 1s ease-in-out;
        }
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px;
            animation: fadeIn 2s;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .content p {
            line-height: 1.8;
            margin-bottom: 20px;
            font-size: 16px;
        }
        .button {
            display: block;
            padding: 12px 20px;
            margin: 30px 0;
            font-size: 18px;
            color: #ffffff;
            background-color: #28a745;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            text-align: center;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
            animation: bounce 1.5s infinite;
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
            border-top: 4px solid #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${subject}</h1>
        </div>
        <div class="content">
            <p>${body}</p>
        </div>
    </div>
</body>
</html>
`;
}

module.exports = businessTemplate;