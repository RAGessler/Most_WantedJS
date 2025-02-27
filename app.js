/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents PID: ${person.parents}\n`;
    personInfo += `Spouse PID: ${person.currentSpouse}\n`;
    personInfo += `Person ID: ${person.id}\n`;
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function findPersonFamily(person, people){
    let parentsList = people.filter(function(element){
        if (person.parents.includes(element.id)){
            return true;
        }
        else{
            return false;
        }
    })
    let siblingList = people.filter(function(element){
        if (element.parents.includes(person.parents)){
            return true;
        }
        else{
            return false;
        }
    })
    let spouse = people.filter(function(element){
        if (element.id === (person.currentSpouse)){
            return true;
        }
        else{
            return false;
        }
    })
    let familyMemebers = spouse.map(function(element){
        return `${element.firstName} ${element.lastName} -Spouse\n`
    })
    familyMemebers.push(siblingList.map(function(element){
        return `${element.firstName} ${element.lastName} -Sibling\n`
    }))
    familyMemebers.push(parentsList.map(function(element){
        return `${element.firstName} ${element.lastName} -Parent\n`
    }))
    return familyMemebers.join('')
}
//End of findPersonFamily()
function findPersonDescendants(person, people){
    let children = []
    let grandChildren = []
    children = people.filter(function(element){
        if (element.parents.includes(person.id)){
            return true;
        }
        else{
            return false
        }
    })
    children.forEach(function(child){grandChildren = (
        people.filter(function(element){
            if (element.parents.includes(child.id)){
                return true;
            }
            else{
                return false;
            }
        })
    )})
    let descendants = children.concat(grandChildren)
    return descendants.map(function(element){
        return`${element.firstName} ${element.lastName}\n`
    }).join('')
}
//end of findPersonDescendants()

//search by traits
function createTraitList(numberOfLoops){
    let traitsList = []
    for (let i = 0; i < numberOfLoops; i++) {
    traitsList.push(prompt(`Please enter trait ${numberOfLoops} `))
    }
    return traitsList
}
function searchByTraits(people){
    let functionSelector = prompt('would you like to search for a single trait or multiple traits? type "single" or "multiple" ')
    functionSelector.toLowerCase()
    if (functionSelector === 'single'){
        return searchByTrait(people)
    }
    else if (functionSelector === "multiple"){
        return filterMenu(people)
    }
    else{
        alert('Invalid input, please try again')
        return searchByTraits(people)
    }
}
function filterMenu(people){
    let returnList = people
    let keepFiltering = true
    let counter = 0
    while (keepFiltering === true) {
    let filterPrompt = prompt('Filtering by multiple properties, \n Please select which property you would like to filter by one at a time\n Options: "gender", "height", "weight", "eye color", "occupation" "submit"')
    switch (filterPrompt) {
        case 'occupation':
    
            returnList = filterOccupation(returnList)
            break;
        case 'gender':
    
            returnList = filterGender(returnList)
            break;
        case 'height':
    
            returnList = filterHeight(returnList)
            break;
        case 'weight':
    
            returnList = filterWeight(returnList)
            break;
        case 'eye color':
    
            returnList = filterEyeColor(returnList)
            break;
        case 'submit':
            keepFiltering = false
            break;
            
        default:
            break;
    }  
}
return pickFromPrompt(returnList)
}
function pickFromPrompt(people) {
    let selectedPerson = prompt('Type the first name of the person youre looking for from options:\n  If empty, No person was found.\n' +
        people.map(function(person) {
            return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
    return people.filter(function(element){
        if (element.firstName === selectedPerson){
            return true;
        }
        else{
            return false;
        }
    })
}
function filterGender(objectList){
let eyeGenderInput = prompt('Input Gender').toLowerCase()
let filteredList = objectList.filter(function(element){
    if (element.gender === eyeGenderInput){
        return true;
    }
    else{
        return false;
    }})
    return filteredList
}
function filterHeight(objectList){
let heightInput = prompt('Input Height').toLowerCase()
let filteredList = objectList.filter(function(element){
    if (element.height == heightInput){
        return true;
    }
    else{
        return false;
    }})
    return filteredList
}
function filterWeight(objectList){
let weightInput = prompt('Input Weight').toLowerCase()
let filteredList = objectList.filter(function(element){
    if (element.weight == weightInput){
        return true;
    }
    else{
        return false;
    }})
    return filteredList
}
function filterEyeColor(objectList){
let eyeColorInput = prompt('Input Eye Color').toLowerCase()
let filteredList = objectList.filter(function(element){
    if (element.eyeColor === eyeColorInput){
        return true;
    }
    else{
        return false;
    }})
    return filteredList
}
function filterOccupation(objectList){
let occupationInput = prompt('Input Occupation').toLowerCase()
let filteredList = objectList.filter(function(element){
    if (element.occupation === occupationInput){
        return true;
    }
    else{
        return false;
    }})
    return filteredList
}
function searchByTrait(people){
    let searchTrait = prompt('Please input a trait you would like to search by:')
    searchTrait.toLowerCase()
    let peopleWithTrait = people.filter(function(element){
        if (element.gender === searchTrait || 
        element.dob === searchTrait ||
        element.height === searchTrait ||
        element.weight === searchTrait ||
        element.eyeColor === searchTrait ||
        element.occupation === searchTrait){
            return true;
        }
        else{
            return false;
        }
    })
    return pickFromPrompt(peopleWithTrait);
}