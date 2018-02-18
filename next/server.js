const express = require('express');
const next = require('next');
const port = parseInt(process.env.port, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/', (request, response) => response.redirect(301, '/blog'));

    // render index.js when the user hits /blog. Hence the '/'.
    server.get('/blog', (request, response) => app.render(request, response, '/'));

    // render the individual post.
    server.get('/blog/:postId', (request, response) => {
        app.render(request, response, '/post')
    });

    server.get('/*', (request, response) => handle(request, response));

    server.listen(port, err => {
        if (err) throw err;

        console.log(`> Read on http://localhost:${port}`)
    })
});