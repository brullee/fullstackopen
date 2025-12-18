sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the single page app HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the single page app JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON file asynchronously from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "STEVE J*BS !!!", "date": "2025-12-17" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes