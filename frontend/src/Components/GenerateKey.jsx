import React, { useState } from 'react';
import { Mail, Key, Copy, Check, Code, Info, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const GenerateKey = () => {
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [copiedStates, setCopiedStates] = useState({
    toast: false,
    snippet: false,
    script: false
  });

  const generateAccessKey = async () => {
    const toastId = toast.loading("Generating Access Key...");
    if (!email || !email.includes('@')) {
      toast.error("Enter a valid email address");
      toast.dismiss(toastId);
      return;
    }

    try {
      const URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${URL}sendaccesskey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setAccessKey(data.access_key);
        toast.dismiss(toastId);
        toast.success("Access Key sent to email successfully");
      } else {
        toast.dismiss(toastId);
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error in generating access key");
    }
  };

  const getToastSnippet = () => {
    return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
`;
  }

  const getFormSnippet = () => {
    return `
      <form id="mailForm" action="https://mail-service-t9q1.vercel.app/sendmail" method="post">
  <label for="sender">Sender:</label><br>
  <input type="text" id="sender" name="sender" placeholder="Enter sender email" required><br><br>
  
  <label for="subject">Subject:</label><br>
  <input type="text" id="subject" name="subject" placeholder="Enter subject" required><br><br>

  <label for="body">Body:</label><br>
  <textarea id="body" name="body" placeholder="Enter your message" rows="4" required></textarea><br><br>
  
  <!-- Hidden field for the access key -->
  <input type="hidden" id="access_key" name="access_key" value="04a0aa25-9810-44c0-8828-07b4c7d40600">
  
  <button type="submit">Send Mail</button>
</form>
    `;
  };

  const getFormScript = () => {
    return `
  
  document.getElementById('mailForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
      sender: form.sender.value,
      subject: form.subject.value,
      body: form.body.value,
      access_key: form.access_key.value,
    };

    try {
        Toastify({
          text: "Sending Email...",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "gray",
        }).showToast();

      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Toastify({
          text: "Mail sent successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
        }).showToast();
        form.reset();
      } else {
        const errorData = await response.json();
        Toastify({
          text: \`Error: \${errorData.message}\`,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "An unexpected error occurred!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "orange",
      }).showToast();
    }
  });
    
    `;
  };

  const handleCopy = (content, type) => {
    navigator.clipboard.writeText(content);
    setCopiedStates(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const CodeBlock = ({ title, code, type, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Icon className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={() => handleCopy(code, type)}
          className={`${
            copiedStates[type] 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center text-sm`}
        >
          {copiedStates[type] ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-900 rounded-b-xl">
        <pre className="p-4 sm:p-6 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Email Form Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate your access key and get ready-to-use email form code
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-3">
              Generate Access Key
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  onClick={generateAccessKey}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center whitespace-nowrap"
                >
                  <Key className="w-5 h-5 mr-2" />
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        </div>

        {accessKey && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="font-semibold text-blue-900 mb-2">Integration Steps</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                      <span>Add the CDN links to your HTML head section</span>
                    </div>
                    <div className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                      <span>Copy and paste the form code into your HTML body</span>
                    </div>
                    <div className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                      <span>Add the JavaScript code before the closing body tag</span>
                    </div>
                    <div className="flex items-start">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                      <span>Replace YOUR_ACCESS_KEY with your actual access key</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              title="Step 1: Add CDN for Toasts"
              code={getToastSnippet()}
              type="toast"
              icon={Code}
            />

            <CodeBlock
              title="Step 2: HTML Form Code"
              code={getFormSnippet()}
              type="snippet"
              icon={Code}
            />

            <CodeBlock
              title="Step 3: JavaScript Code"
              code={getFormScript()}
              type="script"
              icon={Code}
            />

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Your access key has been sent to your email address
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Replace "YOUR_ACCESS_KEY" in the form code with your actual key
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Customize the form styling to match your website design
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Test the form thoroughly before deploying to production
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateKey;