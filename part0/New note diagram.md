sequenceDiagram
    participant browser
    participant server

   Note right of browser: The user submits a new note using the form

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Found (Location: /exampleapp/note)
    deactivate server

    Note left of server: The server responds with a URL redirect and asks the browser to perform a new HTTP GET request for /exampleapp/notes

    Note right of browser: The browser reloads the Notes page, causing 3 more HTTP requests: Fetching the HTML, CSS, and JS files

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JS code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "New Note", "date": "2025-12-17" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes