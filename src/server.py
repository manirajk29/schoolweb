from flask import Flask, request, jsonify
import PyPDF2
import os

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Read PDF content
    pdf_reader = PyPDF2.PdfReader(file)
    pdf_text = "\n".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

    return jsonify({"text": pdf_text})

if __name__ == '__main__':
    app.run(debug=True)
