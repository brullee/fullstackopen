sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa (JSON: {content: "New Note", date: "2025-12-18"})
    activate server
    server-->>browser: 201 Created {"message":"note created"}
    deactivate server