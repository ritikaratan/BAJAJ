import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type='application/json'):
        self.send_response(status)
        self.send_header('Content-type', content_type)
        self.end_headers()

    def do_GET(self):
        if self.path == '/bfhl':
            self._set_headers()
            response = {
                "operation_code": 1
            }
            self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        if self.path == '/bfhl':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8')).get('data', [])

            numbers = [item for item in data if item.isdigit()]
            alphabets = [item for item in data if item.isalpha()]
            highest_alphabet = max(alphabets, key=str.lower, default="")

            response = {
                "is_success": True,
                "user_id": "dfd40e16-74f6-4397-9461-4cb46396e603",
                "email": "ritikaratan12@gmail.com",
                "roll_number": "RA2111028030008",
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_alphabet": [highest_alphabet] if highest_alphabet else []
            }
            self._set_headers()
            self.wfile.write(json.dumps(response).encode())

def run(server_class=HTTPServer, handler_class=RequestHandler, port=19500):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()



