const http = require('http');

const requestListener = (request, response) => {
    const { method, url } = request;
    response.setHeader('Content-Type', 'application/json');

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'halaman dashboard!'
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                try {
                    const { name } = JSON.parse(body);
                    response.statusCode = 201;
                    response.end(JSON.stringify({
                        message: `Halo, ${name}! ini adalah halaman dashboard`
                    }));
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        error: 'Invalid JSON format!'
                    }));
                }
            });
        } else if (method === 'DELETE') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'halo DELETE!'
            }));
        } else {
            response.statusCode = 405;
            response.end(JSON.stringify({
                error: `halaman tidak bisa di akses dengan ${method}!`
            }));
        }

    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'halaman about!'
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                try {
                    const { name } = JSON.parse(body);
                    response.statusCode = 201;
                    response.end(JSON.stringify({
                        message: `Halo, ${name}! ini adalah halaman about`
                    }));
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        error: 'Invalid JSON format!'
                    }));
                }
            });
        } else if (method === 'DELETE') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'halo DELETE!'
            }));
        } else {
            response.statusCode = 405;
            response.end(JSON.stringify({
                error: `halaman tidak bisa di akses dengan ${method}!`
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            error: 'Halaman tidak ditemukan!'
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});