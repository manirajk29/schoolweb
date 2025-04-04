from flask import Flask, request, jsonify
import PyPDF2
import requests
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, or configure as needed

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

API_KEY = os.environ.get('GEMINI_API_KEY', 'YOUR_API_KEY')  # Set as environment variable

@app.route('/', methods=['GET'])
def index():
    return jsonify({"response": "Server is running.  Send a POST request to /api/process-pdf with a PDF file and prompt."}), 200

@app.route('/api/process-pdf', methods=['POST'])
def process_pdf():
    if 'pdf_file' not in request.files:
        return jsonify({"response": "No PDF file provided. What would you like to know?"}), 200
    
    pdf_file = request.files['pdf_file']
    prompt = request.form.get('prompt', '')
    
    if pdf_file.filename == '':
        return jsonify({"response": "No selected file. What would you like to know?"}), 200
    
    if pdf_file:
        # Save the file temporarily
        filename = secure_filename(pdf_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        pdf_file.save(file_path)
        
        try:
            # Extract text from PDF using PyPDF2
            pdf_text = extract_text_from_pdf(file_path)
            
            # Get response from Gemini API with the PDF text and prompt
            gemini_response = call_gemini_api(prompt, pdf_text)
            
            # Clean up - remove the temporary file
            os.remove(file_path)
            
            return jsonify({"response": gemini_response}), 200
        
        except Exception as e:
            # Clean up in case of error
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Invalid request"}), 400

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file using PyPDF2."""
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"


def call_gemini_api(prompt, pdf_content=""):
    """Call the Gemini API with the prompt and PDF content."""
    if not API_KEY or API_KEY == 'YOUR_API_KEY':
        return "API Key is not configured. Please set your Gemini API key."
    
    combined_input = f"{pdf_content}\n\nBased on the above PDF content, {prompt}"
    
    try:
        response = requests.post(
            f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key={API_KEY}",
            json={
                "contents": [{"parts": [{"text": combined_input}]}]
            },
            headers={"Content-Type": "application/json"}
        )
        
        response.raise_for_status()
        data = response.json()
        return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response from API")
    
    except requests.exceptions.RequestException as e:
        return f"Error calling Gemini API: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)

