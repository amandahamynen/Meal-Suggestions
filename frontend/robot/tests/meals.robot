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

Shows correct meal when clicking button
    Wait For Elements State    css=[data-testid="suggest-meal-button"]    visible
    Click    css=[data-testid="suggest-meal-button"]
    Wait For Elements State    text=Pizza    visible
    Get Text    text=Pizza    ==    Pizza

Shows correct meals on meals page
    New Page    ${URL_FRONTEND}/meals
    Wait For Elements State   css=[data-testid="meal-grid"]    visible
    Get Text    css=[data-testid="meal-card-title"]    ==    Pizza

Adds meal and shows it in meals-page
    New Page    ${URL_FRONTEND}/meals
    Wait For Elements State    css=[data-testid="meal-grid"]    visible
    Fill Text    css=[data-testid="meal-add-input"]    Hernekeitto
    Click    css=[data-testid="meal-add-button"]
    Wait For Elements State    text=Hernekeitto    visible
    Get Text    text=Hernekeitto    ==    Hernekeitto

Deletes meal and it no longer shows on meals page
    New Page    ${URL_FRONTEND}/meals
    Wait For Elements State    css=[data-testid="meal-grid"]    visible
    Fill Text    css=[data-testid="meal-add-input"]    Lohikeitto
    Click    css=[data-testid="meal-add-button"]
    Wait For Elements State    text=Lohikeitto    visible
    ${card}=    Get Element    css=[data-testid="meal-card"] >> text=Lohikeitto
    Handle Future Dialogs    accept
    ${card}=    Get Element    xpath=//div[@data-testid="meal-card" and .//span[text()="Lohikeitto"]]
    Click    ${card} >> css=[data-testid="meal-delete-button"]
    Wait For Elements State    text=Lohikeitto    hidden