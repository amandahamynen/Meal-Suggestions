*** Settings ***
Library    Browser
Library    RequestsLibrary
Suite Setup    Reset Test Database And Open App
Suite Teardown    Close Browser

*** Variables ***
${URL_BACKEND}    http://localhost:8080
${URL_FRONTEND}    http://localhost:5173

*** Keywords ***
Reset Test Database And Open App
    Create Session    backend    ${URL_BACKEND}
    GET On Session    backend    /test/reset-db
    New Browser    chromium    headless=true
    New Page    ${URL_FRONTEND}

*** Test Cases ***
Page Loads
    Get Title    ==    frontend

Shows no meals when database is empty
    Wait For Elements State    css=[data-testid="meal-suggestion-title"]    visible
    Get Text    css=[data-testid="meal-suggestion-title"]    ==    No meals available

Shows correct title and button when database has meals
    &{meal}=    Create Dictionary    name=Pizza
    POST On Session    backend    /meals    json=${meal}
    Reload
    Wait For Elements State    css=[data-testid="meal-suggestion-title"]    visible
    Get Text    css=[data-testid="meal-suggestion-title"]    ==    I should make...