// random generator success function
function randomGeneratorSuccess(response) {
    var random_container = document.getElementById('random_activity_container');
    var activity_message = document.createElement('h1');
    activity_message.innerText = "Your activity is: " + response.data.activity;
    random_container.appendChild(activity_message);
}

// random generator failure function
function randomGeneratorFailure(error) {
    var random_container = document.getElementById('random_activity_container');
    var error_message = document.createElement('h1');
    error_message.innerText = "You have ran into a problem, please refresh!";
    random_container.appendChild(error_message);
}

// function to generate random activity
function randomGeneratorButton() {
    axios.request({
        url: "http://www.boredapi.com/api/activity/"
    }).then(randomGeneratorSuccess).catch(randomGeneratorFailure);
}

// random generator success function with participants
function randomGeneratorSuccess_participants(response) {
    var random_container = document.getElementById('random_activity_container');
    var activity_message = document.createElement('h1');
    activity_message.innerText = "Your activity with " + response.data.participants + " participant(s) is: " + response.data.activity;
    random_container.appendChild(activity_message);
}

// random generator success function with participants that is free
function randomGeneratorSuccess_participants_free(response) {
    var random_container = document.getElementById('random_activity_container');
    var activity_message = document.createElement('h1');
    activity_message.innerText = "Your FREE activity with " + response.data.participants + " participant(s) is: " + response.data.activity;
    random_container.appendChild(activity_message);
}

// function to generate random activity based on how many participants
function randomGeneratorButton_participants(random) {
    var participant_selection = document.getElementById('participants');
    var no_of_participants = participant_selection.options[participant_selection.selectedIndex].value;

    var free_event_checkbox = document.getElementById('free_event_checkbox');
    if (free_event_checkbox.checked === true) {
        var free_event_indicator = 0;

        axios.request({
            url: "http://www.boredapi.com/api/activity",
            params: {
                participants: no_of_participants,
                price: free_event_indicator
            }
            // using the same failure function since the purpose is the same
        }).then(randomGeneratorSuccess_participants_free).catch(randomGeneratorFailure);
    } else {

        axios.request({
            url: "http://www.boredapi.com/api/activity",
            params: {
                participants: no_of_participants,
            }
            // using the same failure function since the purpose is the same
        }).then(randomGeneratorSuccess_participants).catch(randomGeneratorFailure);
    }
}

// add event listiner to SUBMIT button
var submit_button = document.getElementById('participants_button');
submit_button.addEventListener('click', randomGeneratorButton_participants);

// add event listener to Click ME button
var random_button = document.getElementById('new_random_activity_button');
random_button.addEventListener('click', randomGeneratorButton);

