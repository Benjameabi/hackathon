/* =====================================
   📚 BEGINNER JAVASCRIPT STUDY GUIDE
   ===================================== */

/*
 * 🎯 WHAT IS JAVASCRIPT?
 * JavaScript is a programming language that makes websites interactive.
 * It can change text, colors, respond to clicks, and much more!
 * 
 * 📝 HOW TO STUDY THIS FILE:
 * 1. Read each section carefully
 * 2. Try to understand what each line does
 * 3. Experiment by changing values
 * 4. Use the browser console (F12) to test code
 */

// =====================================
// 📖 SECTION 1: VARIABLES & DATA TYPES
// =====================================

/*
 * 🧠 WHAT ARE VARIABLES?
 * Variables are like boxes that store information.
 * Think of them as labeled containers that hold different types of data.
 */

// 📌 DIFFERENT WAYS TO CREATE VARIABLES:

// let - for variables that can change
let studentName = "Alice";           // Text (string)
let studentAge = 20;                 // Number
let isStudent = true;                // True/false (boolean)

// const - for variables that never change
const schoolName = "Chas Academy";   // This will always be the same
const maxStudents = 30;              // This limit won't change

// Examples of changing variables:
console.log("Before:", studentName);  // Shows: Alice
studentName = "Bob";                  // Changing the value
console.log("After:", studentName);   // Shows: Bob

/*
 * 🎓 STUDY NOTES - DATA TYPES:
 * 
 * 1. STRING (text): Always in quotes "like this" or 'like this'
 * 2. NUMBER: Any number like 25, 3.14, -10
 * 3. BOOLEAN: Only true or false
 * 4. UNDEFINED: Variable exists but has no value yet
 * 5. NULL: Intentionally empty value
 */

// =====================================
// 📖 SECTION 2: FUNCTIONS (REUSABLE CODE)
// =====================================

/*
 * 🧠 WHAT ARE FUNCTIONS?
 * Functions are like recipes - they contain instructions that you can use over and over.
 * Instead of writing the same code multiple times, you create a function once and use it many times.
 */

// 📌 SIMPLE FUNCTION EXAMPLE:
function sayHello() {
    console.log("Hello, World!");
}

// To use (or "call") the function:
sayHello(); // This will print "Hello, World!" to the console

// 📌 FUNCTION WITH PARAMETERS (inputs):
function greetStudent(name) {
    console.log("Hello, " + name + "!");
}

// Using the function with different inputs:
greetStudent("Emma");    // Prints: Hello, Emma!
greetStudent("Lucas");   // Prints: Hello, Lucas!

// 📌 FUNCTION THAT RETURNS A VALUE:
function addTwoNumbers(firstNumber, secondNumber) {
    let result = firstNumber + secondNumber;
    return result; // Sends the answer back
}

// Using the function and storing the result:
let sum = addTwoNumbers(5, 3);
console.log("5 + 3 = " + sum); // Shows: 5 + 3 = 8

/*
 * 🎓 STUDY NOTES - FUNCTIONS:
 * 
 * 1. function - the keyword that creates a function
 * 2. functionName() - the name you give your function
 * 3. parameters - inputs the function needs (go inside parentheses)
 * 4. return - sends a value back when the function is done
 * 5. Calling a function - using the function by writing its name with ()
 */

// =====================================
// 📖 SECTION 3: WORKING WITH HTML ELEMENTS
// =====================================

/*
 * 🧠 WHAT IS THE DOM?
 * DOM stands for "Document Object Model" - it's how JavaScript talks to HTML.
 * Think of it as JavaScript's way to find and change things on a webpage.
 */

// 📌 FINDING ELEMENTS ON THE PAGE:

// Find an element by its ID
function findElementById(elementId) {
    let element = document.getElementById(elementId);
    return element;
}

// Find an element by its class name
function findElementByClass(className) {
    let element = document.querySelector('.' + className);
    return element;
}

// 📌 CHANGING WHAT'S ON THE PAGE:

function changeTextContent(elementId, newText) {
    let element = findElementById(elementId);
    if (element) { // Check if element exists
        element.textContent = newText;
        console.log("Changed text to: " + newText);
    } else {
        console.log("Element not found!");
    }
}

// 📌 ADDING CSS CLASSES (for styling):

function addStyleClass(elementId, className) {
    let element = findElementById(elementId);
    if (element) {
        element.classList.add(className);
        console.log("Added class: " + className);
    }
}

function removeStyleClass(elementId, className) {
    let element = findElementById(elementId);
    if (element) {
        element.classList.remove(className);
        console.log("Removed class: " + className);
    }
}

/*
 * 🎓 STUDY NOTES - DOM MANIPULATION:
 * 
 * 1. document - represents the entire webpage
 * 2. getElementById() - finds an element with a specific ID
 * 3. querySelector() - finds an element with a CSS selector
 * 4. textContent - the text inside an element
 * 5. classList - controls CSS classes on an element
 * 6. Always check if element exists before using it!
 */

// =====================================
// 📖 SECTION 4: EVENT HANDLING (USER INTERACTIONS)
// =====================================

/*
 * 🧠 WHAT ARE EVENTS?
 * Events are things that happen on a webpage: clicks, typing, scrolling, etc.
 * JavaScript can "listen" for these events and respond to them.
 */

// 📌 RESPONDING TO BUTTON CLICKS:

function setupButtonClick(buttonId) {
    let button = findElementById(buttonId);
    
    if (button) {
        // Add an event listener (waits for clicks)
        button.addEventListener('click', function() {
            console.log("Button was clicked!");
            alert("Hello! You clicked the button.");
        });
    }
}

// 📌 HANDLING FORM SUBMISSIONS:

function setupContactForm() {
    let form = findElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Prevent the page from refreshing
            event.preventDefault();
            
            // Get form data
            let nameInput = findElementById('name');
            let emailInput = findElementById('email');
            let messageInput = findElementById('message');
            
            // Check if all fields are filled
            if (nameInput.value && emailInput.value && messageInput.value) {
                console.log("Form submitted successfully!");
                console.log("Name:", nameInput.value);
                console.log("Email:", emailInput.value);
                console.log("Message:", messageInput.value);
                alert("Thank you! Your message was sent.");
                
                // Clear the form
                form.reset();
            } else {
                alert("Please fill in all fields!");
            }
        });
    }
}

/*
 * 🎓 STUDY NOTES - EVENTS:
 * 
 * 1. addEventListener() - tells JavaScript to listen for an event
 * 2. 'click' - the type of event (click, submit, keypress, etc.)
 * 3. function() - what to do when the event happens
 * 4. event.preventDefault() - stops the default action
 * 5. .value - gets the text from input fields
 * 6. .reset() - clears all form fields
 */

// =====================================
// 📖 SECTION 5: SIMPLE ANIMATIONS & EFFECTS
// =====================================

/*
 * 🧠 WHAT ARE ANIMATIONS?
 * Animations make things move or change gradually on the page.
 * They make websites feel more alive and interactive!
 */

// 📌 SIMPLE SHOW/HIDE TOGGLE:

function toggleVisibility(elementId) {
    let element = findElementById(elementId);
    
    if (element) {
        // Check if element is currently hidden
        if (element.style.display === 'none') {
            element.style.display = 'block'; // Show it
            console.log("Element is now visible");
        } else {
            element.style.display = 'none';  // Hide it
            console.log("Element is now hidden");
        }
    }
}

// 📌 CHANGE COLORS:

function changeBackgroundColor(elementId, color) {
    let element = findElementById(elementId);
    
    if (element) {
        element.style.backgroundColor = color;
        console.log("Changed background to: " + color);
    }
}

// 📌 SMOOTH SCROLLING TO SECTIONS:

function scrollToSection(sectionId) {
    let section = findElementById(sectionId);
    
    if (section) {
        // Smoothly scroll to the section
        section.scrollIntoView({
            behavior: 'smooth',  // Makes it slide smoothly
            block: 'start'       // Aligns to the top
        });
    }
}

/*
 * 🎓 STUDY NOTES - SIMPLE EFFECTS:
 * 
 * 1. .style - lets you change CSS properties with JavaScript
 * 2. display: 'none' - hides an element completely
 * 3. display: 'block' - shows an element
 * 4. backgroundColor - changes the background color
 * 5. scrollIntoView() - scrolls the page to show an element
 * 6. behavior: 'smooth' - makes scrolling animated
 */

// =====================================
// 📖 SECTION 6: PRACTICAL EXAMPLES
// =====================================

/*
 * 🧠 REAL-WORLD EXAMPLES:
 * Here are some practical functions you might use on a real website.
 */

// 📌 MOBILE MENU TOGGLE:

function setupMobileMenu() {
    let menuButton = findElementById('mobile-menu-button');
    let menu = findElementById('mobile-menu');
    
    if (menuButton && menu) {
        menuButton.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide menu
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                console.log("Menu closed");
            } else {
                menu.classList.add('active');
                console.log("Menu opened");
            }
        });
    }
}

// 📌 SIMPLE IMAGE GALLERY:

function setupImageGallery() {
    let thumbnails = document.querySelectorAll('.thumbnail');
    let mainImage = findElementById('main-image');
    
    // Add click listeners to all thumbnails
    thumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
            // Get the large image URL from data attribute
            let largeImageUrl = thumbnail.getAttribute('data-large');
            
            if (mainImage && largeImageUrl) {
                mainImage.src = largeImageUrl;
                console.log("Changed main image to:", largeImageUrl);
            }
        });
    });
}

// 📌 SIMPLE COUNTER:

let counter = 0; // Global variable to store count

function increaseCounter() {
    counter = counter + 1;
    console.log("Counter is now:", counter);
    
    // Update the display
    let counterDisplay = findElementById('counter-display');
    if (counterDisplay) {
        counterDisplay.textContent = counter;
    }
}

function decreaseCounter() {
    if (counter > 0) { // Don't go below zero
        counter = counter - 1;
        console.log("Counter is now:", counter);
        
        // Update the display
        let counterDisplay = findElementById('counter-display');
        if (counterDisplay) {
            counterDisplay.textContent = counter;
        }
    }
}

function resetCounter() {
    counter = 0;
    console.log("Counter reset to 0");
    
    // Update the display
    let counterDisplay = findElementById('counter-display');
    if (counterDisplay) {
        counterDisplay.textContent = counter;
    }
}

/*
 * 🎓 STUDY NOTES - PRACTICAL TIPS:
 * 
 * 1. Always check if elements exist before using them
 * 2. Use console.log() to debug and see what's happening
 * 3. Global variables (like counter) can be accessed by any function
 * 4. querySelectorAll() finds ALL elements with a class/selector
 * 5. forEach() loops through a list of elements
 * 6. data-* attributes store custom information in HTML
 */

// =====================================
// 📖 SECTION 7: INITIALIZATION (SETUP)
// =====================================

/*
 * 🧠 WHAT IS INITIALIZATION?
 * This is where we set up everything when the page loads.
 * It's like preparing all the ingredients before cooking!
 */

// 📌 MAIN SETUP FUNCTION:

function initializeWebsite() {
    console.log("🚀 Website is starting up...");
    
    // Set up all our interactive features
    setupButtonClick('main-button');
    setupContactForm();
    setupMobileMenu();
    setupImageGallery();
    
    // Set up counter buttons
    let increaseBtn = findElementById('increase-btn');
    let decreaseBtn = findElementById('decrease-btn');
    let resetBtn = findElementById('reset-btn');
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', increaseCounter);
    }
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', decreaseCounter);
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCounter);
    }
    
    console.log("✅ Website setup complete!");
}

// 📌 WAIT FOR PAGE TO LOAD, THEN INITIALIZE:

// Check if the page is already loaded
if (document.readyState === 'loading') {
    // Page is still loading, wait for it to finish
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    // Page is already loaded, start immediately
    initializeWebsite();
}

/*
 * 🎓 STUDY NOTES - INITIALIZATION:
 * 
 * 1. DOMContentLoaded - fires when HTML is fully loaded
 * 2. document.readyState - tells us if page is still loading
 * 3. Put all setup code in one place for organization
 * 4. Always wait for page to load before accessing elements
 * 5. Use console messages to track what's happening
 */

// =====================================
// 📖 SECTION 8: HELPFUL DEBUGGING TIPS
// =====================================

/*
 * 🧠 HOW TO DEBUG (FIND PROBLEMS):
 * When your code doesn't work, these tips will help you find out why!
 */

// 📌 CONSOLE LOGGING FOR DEBUGGING:

function debugExample() {
    console.log("🔍 Starting debug example...");
    
    let testElement = findElementById('test-element');
    console.log("Found element:", testElement); // Will show null if not found
    
    if (testElement) {
        console.log("Element text:", testElement.textContent);
        console.log("Element classes:", testElement.className);
    } else {
        console.log("❌ Element not found! Check your HTML ID.");
    }
}

// 📌 ERROR HANDLING:

function safeFunction(elementId) {
    try {
        // Code that might cause an error
        let element = findElementById(elementId);
        element.textContent = "New text";
        console.log("✅ Success!");
    } catch (error) {
        // If an error happens, this runs instead
        console.log("❌ Error occurred:", error.message);
        console.log("💡 Tip: Check if the element exists in your HTML");
    }
}

/*
 * 🎓 STUDY NOTES - DEBUGGING:
 * 
 * 1. console.log() - your best friend for seeing what's happening
 * 2. Check the browser console (F12) for error messages
 * 3. null means "nothing found" - check your IDs and classes
 * 4. try/catch helps handle errors gracefully
 * 5. Add lots of console.log() statements when testing
 * 6. Test one small piece at a time
 */

// =====================================
// 📚 FINAL STUDY SUMMARY
// =====================================

/*
 * 🎯 WHAT YOU'VE LEARNED:
 * 
 * 1. VARIABLES: Store information (let, const)
 * 2. FUNCTIONS: Reusable blocks of code
 * 3. DOM: How to find and change HTML elements
 * 4. EVENTS: Responding to user actions (clicks, etc.)
 * 5. EFFECTS: Simple animations and visual changes
 * 6. EXAMPLES: Real-world applications
 * 7. SETUP: How to initialize your website
 * 8. DEBUGGING: How to find and fix problems
 * 
 * 🚀 NEXT STEPS:
 * 
 * 1. Practice changing values and see what happens
 * 2. Add your own functions for new features
 * 3. Experiment with different CSS classes and styles
 * 4. Try building a simple interactive feature
 * 5. Use the browser console to test small pieces of code
 * 
 * 💡 REMEMBER:
 * 
 * - Start small and build up gradually
 * - It's okay to make mistakes - that's how you learn!
 * - Use console.log() to understand what's happening
 * - Practice regularly to build your skills
 * - Don't be afraid to experiment and try new things
 * 
 * Happy coding! 🎉
 */
