document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var modal = document.getElementById("modalEventAdd");
    var closeButton = document.querySelector(".close");
    var eventForm = document.getElementById("eventForm");

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        customButtons: {},
        dateClick: function(info) {
            modal.style.display = "block";
            eventForm.onsubmit = function(e) {
                e.preventDefault();
                var title = document.getElementById("eventTitle").value;
                var color = document.getElementById("eventColor").value;
                if(title) {
                    calendar.addEvent({
                        title: title,
                        start: info.dateStr,
                        color: color, // background color
                        textColor: 'white' // text color
                    });
                    modal.style.display = "none";
                    eventForm.reset();
                }
            };
        },
        themeSystem: 'bootstrap',
    });

    calendar.render();

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
