(function ($) {

    "use strict";

    // Setup the calendar with the current date
    $(document).ready(function () {
        var date = new Date();
        var today = date.getDate();
        // Set click handlers for DOM elements
        $(".right-button").click({date: date}, next_year);
        $(".left-button").click({date: date}, prev_year);
        $(".month").click({date: date}, month_click);
        $("#add-button").click({date: date}, new_event);
        // Set current month as active
        $(".months-row").children().eq(date.getMonth()).addClass("active-month");
        init_calendar(date);
        var events = check_events(today, date.getMonth() + 1, date.getFullYear());
        show_events_from_db(events, date.getFullYear(), months[date.getMonth()], today);
    });

    // Initialize the calendar by appending the HTML dates
    function init_calendar(date) {
        $(".tbody").empty();
        $(".events-container").empty();
        var calendar_days = $(".tbody");
        var month = date.getMonth();
        var year = date.getFullYear();
        var day_count = days_in_month(month, year);
        var row = $("<tr class='table-row'></tr>");
        var today = date.getDate();
        // Set date to 1 to find the first day of the month
        date.setDate(1);
        var first_day = date.getDay();
        // 35+firstDay is the number of date elements to be added to the dates table
        // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
        for (var i = 0; i < 35 + first_day; i++) {
            // Since some of the elements will be blank,
            // need to calculate actual date from index
            var day = i - first_day + 1;
            // If it is a sunday, make a new row
            if (i % 7 === 0) {
                calendar_days.append(row);
                row = $("<tr class='table-row'></tr>");
            }
            // if current index isn't a day in this month, make it blank
            if (i < first_day || day > day_count) {
                var curr_date = $("<td class='table-date nil'>" + "</td>");
                row.append(curr_date);
            } else {
                var curr_date = $("<td class='table-date'>" + day + "</td>");
                var events = check_events(day, month + 1, year);
                if (today === day && $(".active-date").length === 0) {
                    curr_date.addClass("active-date");
                    show_events_from_db(events, year, months[month], day);
                }
                // If this date has any events, style it with .event-date
                if (events.length !== 0) {
                    curr_date.addClass("event-date");
                }
                // Set onClick handler for clicking a date
                curr_date.click({events: events, year: year, month: months[month], day: day}, date_click);
                row.append(curr_date);
            }
        }
        // Append the last row and set the current year
        calendar_days.append(row);
        $(".year").text(year);
    }

    // Get the number of days in a given month/year
    function days_in_month(month, year) {
        var monthStart = new Date(year, month, 1);
        var monthEnd = new Date(year, month + 1, 1);
        return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    }

    // Event handler for when a date is clicked
    function date_click(event) {
        $(".events-container").show(250);
        $("#dialog").hide(250);
        $(".active-date").removeClass("active-date");
        $(this).addClass("active-date");
        // show_events(event.data.events, event.data.month, event.data.day);
        show_events_from_db(event.data.events, event.data.year, event.data.month, event.data.day);
    };

    // Event handler for when a month is clicked
    function month_click(event) {
        $(".events-container").show(250);
        $("#dialog").hide(250);
        var date = event.data.date;
        $(".active-month").removeClass("active-month");
        $(this).addClass("active-month");
        var new_month = $(".month").index(this);
        date.setMonth(new_month);
        init_calendar(date);
    }

    // Event handler for when the year right-button is clicked
    function next_year(event) {
        $("#dialog").hide(250);
        var date = event.data.date;
        var new_year = date.getFullYear() + 1;
        $("year").html(new_year);
        date.setFullYear(new_year);
        init_calendar(date);
    }

    // Event handler for when the year left-button is clicked
    function prev_year(event) {
        $("#dialog").hide(250);
        var date = event.data.date;
        var new_year = date.getFullYear() - 1;
        $("year").html(new_year);
        date.setFullYear(new_year);
        init_calendar(date);
    }

    // Event handler for clicking the new event button
    function new_event(event) {
        // if a date isn't selected then do nothing
        if ($(".active-date").length === 0)
            return;
        // remove red error input on click
        $("input").click(function () {
            $(this).removeClass("error-input");
        })
        // empty inputs and hide events
        $("#dialog input[type=text]").val('');
        $("#dialog input[type=number]").val('');
        $(".events-container").hide(250);
        $("#dialog").show(250);

        // Event handler for ok button
        $("#ok-button").unbind().click({date: event.data.date}, function () {
            var date = event.data.date;
            var name = $("#name").val().trim();
            var category_type = parseInt($("#category_type").val().trim());
            var category_id = parseInt($("#category_id").val().trim());
            var money_amount = parseInt($("#money_amount").val().trim());
            var describe = $("#describe").val().trim();
            var day = parseInt($(".active-date").html());
            console.log(date);
            // Basic form validation
            if (category_type === 2) {
                $("#category_type").addClass("error-input");
            } else if (category_id === 0) {
                $("#category_id").addClass("error-input");
            } else if (money_amount === 0) {
                $("#money_amount").addClass("error-input");
            } else if (name == null) {
                $("#name").addClass("error-input");
            } else {
                date.setDate(day);
                var date_format = date.toLocaleDateString("en-US");
                $("input[name=date]").val(date_format);
                $('form#form').submit();
                $("#dialog").hide(250);
                console.log("new event");
                // new_event_json(name, category_type, category_id, money_amount, describe, date, day);
                date.setDate(day);
                init_calendar(date);
            }
        });
    }

    // Adds a json event to event_data
    function new_event_json(name, category_type, category_id, money_amount, describe, date, day) {
        var event = {
            "name": name,
            "category_type": category_type,
            "category_name": category_id,
            "money_amount": money_amount,
            "year": date.getFullYear(),
            "month": date.getMonth() + 1,
            "day": day
        };
        event_data["events"].push(event);
    }

    // Display all events of the selected date in card views
    function show_events(events, month, day) {
        // Clear the dates container
        $(".events-container").empty();
        $(".events-container").show(250);
        console.log(event_data["events"]);
        // If there are no events for this date, notify the user
        if (events.length === 0) {
            var event_card = $("<div class='event-card'></div>");
            var event_name = $("<div class='event-name' style='color: black'>Chưa có hoạt động nào trong " + month + " " + day + ".</div>");
            $(event_card).css({"border-left": "10px solid #FF1744"});
            $(event_card).append(event_name);
            $(".events-container").append(event_card);
        } else {
            // Go through and add each event as a card to the events container
            for (var i = 0; i < events.length; i++) {
                var event_card = $("<div class='event-card'></div>");
                var event_name = $("<div class='event-name'>" + events[i]["name"] + ":</div>");
                var event_count = $("<div class='event-count'>" + events[i]["money_amount"] + "</div>");
                $(event_card).append(event_name).append(event_count);
                $(".events-container").append(event_card);
            }
        }
    }

    function show_events_from_db(events, year, month, day) {
        var month_number = 0;
        if (month == 'January') month_number = 1;
        else if (month == 'February') month_number = 2;
        else if (month == 'March') month_number = 3;
        else if (month == 'April') month_number = 4;
        else if (month == 'May') month_number = 5;
        else if (month == 'June') month_number = 6;
        else if (month == 'July') month_number = 7;
        else if (month == 'August') month_number = 8;
        else if (month == 'September') month_number = 9;
        else if (month == 'October') month_number = 10;
        else if (month == 'November') month_number = 11;
        else if (month == 'December') month_number = 12;
        else month_number = 0;
        var date = month_number + '/' + day + '/' + year;
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
            },
            url: '/get-data-activity',
            data: {
                date: date,
            },
            type: 'post',
            cache: true,
            success: function (response) {
                console.log(response);
                $(".events-container").empty();
                $(".events-container").show(250);
                if (response.length === 0) {
                    var event_card = $("<div class='event-card'></div>");
                    var event_name = $("<div class='event-name' style='color: black'>Chưa có hoạt động nào trong ngày " + day + "/" + month_number + ".</div>");
                    $(event_card).css({"border-left": "10px solid #FF1744"});
                    $(event_card).append(event_name);
                    $(".events-container").append(event_card);
                } else {
                    // Go through and add each event as a card to the events container
                    for (var i = 0; i < response.length; i++) {
                        var signal = (response[i]["type"] == 0) ? '+' : '-';
                        var event_card = $("<div class='event-card'></div>");
                        var event_name = $("<div class='event-name' style='color: black'>" + response[i]["name"] + ":</div>");
                        var event_count = $("<div class='event-count'>" + signal + ' ' + response[i]["money_amount"].toLocaleString() + " đồng" + "</div>");
                        $(event_card).append(event_name).append(event_count);
                        $(".events-container").append(event_card);
                    }
                }
                var oldTbdy = document.getElementById('tbody_activities');
                var tbdy = document.createElement('tbody');
                tbdy.id = 'tbody_activities';
                if (response.length === 0) {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.className = 'text-center';
                    td.colSpan = 5;
                    var text = "Chưa có hoạt động nào trong ngày " + day + "/" + month_number + ".";
                    td.appendChild(document.createTextNode(text));
                    tr.appendChild(td);
                    tbdy.appendChild(tr);
                } else {
                    for (var i = 0; i < response.length; i++) {
                        var tr = document.createElement('tr');
                        var td1 = document.createElement('td');
                        td1.appendChild(document.createTextNode(response[i]["name"]));
                        tr.appendChild(td1);
                        var td2 = document.createElement('td');
                        td2.appendChild(document.createTextNode(response[i]["ten_danh_muc"]));
                        tr.appendChild(td2);
                        var td3 = document.createElement('td');
                        td3.appendChild(document.createTextNode((response[i]["type"] == 0) ? 'Thu' : 'Chi'));
                        tr.appendChild(td3);
                        var td4 = document.createElement('td');
                        td4.appendChild(document.createTextNode(response[i]["money_amount"]));
                        tr.appendChild(td4);
                        var td5 = document.createElement('td');
                        td5.appendChild(document.createTextNode(response[i]["describe"]));
                        tr.appendChild(td5);
                        tbdy.appendChild(tr);
                    }
                }
                var table = document.getElementById('table');
                if (oldTbdy) {
                    table.removeChild(oldTbdy);
                    table.appendChild(tbdy);
                }

                var oldTbdy = document.getElementById('tbody_activities1');
                var tbdy = document.createElement('tbody');
                tbdy.id = 'tbody_activities1';
                if (response.length === 0) {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.className = 'text-center';
                    td.colSpan = 5;
                    var text = "Chưa có hoạt động nào trong ngày " + day + "/" + month_number + ".";
                    td.appendChild(document.createTextNode(text));
                    tr.appendChild(td);
                    tbdy.appendChild(tr);
                } else {
                    for (var i = 0; i < response.length; i++) {
                        var tr = document.createElement('tr');
                        var td1 = document.createElement('td');
                        td1.appendChild(document.createTextNode(response[i]["name"]));
                        tr.appendChild(td1);
                        var td2 = document.createElement('td');
                        td2.appendChild(document.createTextNode(response[i]["ten_danh_muc"]));
                        tr.appendChild(td2);
                        var td3 = document.createElement('td');
                        td3.appendChild(document.createTextNode((response[i]["type"] == 0) ? 'Thu' : 'Chi'));
                        tr.appendChild(td3);
                        var td4 = document.createElement('td');
                        td4.appendChild(document.createTextNode(response[i]["money_amount"]));
                        tr.appendChild(td4);
                        var td5 = document.createElement('td');
                        var td6 = document.createElement('td');
                        td5.appendChild(document.createTextNode(response[i]["describe"]));
                        tr.appendChild(td5);

                        td6.innerHTML = '<button type="button" data-id="' + response[i]["activity_id"] + '" class="btn-open-detail"><span><i class="fa fa-pen" aria-hidden="true"></i></span></button>';
                        // td6.html("<div><span><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span></div>");
                        tr.appendChild(td6);
                        tbdy.appendChild(tr);
                    }
                }
                var table = document.getElementById('table1');
                if (oldTbdy) {
                    table.removeChild(oldTbdy);
                    table.appendChild(tbdy);
                }
            },
            error: function (e) {
                alert("Có lỗi trong quá trình xử lý");
            }
        });

    }

    // Checks if a specific date has any events
    function check_events(day, month, year) {
        var events = [];
        for (var i = 0; i < event_data["events"].length; i++) {
            var event = event_data["events"][i];
            if (event["day"] === day &&
                event["month"] === month &&
                event["year"] === year) {
                events.push(event);
            }
        }
        return events;
    }

    // Given data for events in JSON format
    var event_data = {
        "events": []
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
})(jQuery);
