var vehicles = {
    'Towel One': {
        id: '2001',
        name: 'T1',
        model: 'tahoe',
        type: 'car'
    },
        'Towel Two': {
        id: '3456',
        name: 'T2',
        model: 'blue',
        type: 'house'
    },
        'Towel Three': {
        id: '8765',
        name: 'T3',
        model: 'orange',
        type: 'office'
    },
        'Towel Four': {
        id: '9078',
        name: 'T4',
        model: 'yellow',
        type: 'kitchen'
    }
};

$(function () {

    function check_key_event(key_event) {
        // Early exit if key event is not alphanumeric or backspace

        if (!(key_event > 47 && key_event < 58 || key_event > 64 && key_event < 92 || key_event == 8 || key_event === undefined)) {
            return false;
        }
        return true;
    }

    function append_to_results(element, tag, tag2, key, value) {
        // Append list item to results list

        var record = String(key);

        jQuery.each(value, function (key, value) {
            record += (' ' + value);
        });

        $(element).append($(tag).append($(tag2).append(record)));
    }

    function compare_search_term_to_data_set(input_val, key, value) {
        // Compare search term to result set key name and value

        var match = false;

        match = (key.toLowerCase().indexOf(input_val.toLowerCase()) >= 0) ? true : false;

        jQuery.each(value, function (key, value) {
            if (value.toLowerCase().indexOf(input_val.toLowerCase()) >= 0) {
                match = true;
            }
        });

        if (match) {
            append_to_results('.results', '<tr class="match">', '<td>', key, value);
        }
    }

    function search_autocomplete() {
        // Search the list of vehicles and autocomplete the search term

        var key_event = event.which;
        var input_val = $(this).val();

        console.log(key_event);

        // If key pressed is not alphanumeric or backspace, early exit
        if (!check_key_event(key_event)) {
            return false;
        }

        // Clear list of results
        $('.match').remove();

        jQuery.each(vehicles, function (key, value) {

            // Compare search term to result set name
            if (input_val) {
                var match = compare_search_term_to_data_set(input_val, key, value);
            }
        });
    }

    // Add event handler to the input field
    $('.search_term').on('keyup blur change paste cut reset submit', search_autocomplete);


    //--- SPECS -------------------------
    describe("Live Search", function () {

        it("Specifies a JSON Object", function () {
            expect(vehicles).toBeDefined();
        });

        it("Only allowes certain keys to be pressed", function () {
            expect(check_key_event(50)).toBe(true);
        });

        it("Appends search matches to results", function () {
            var TestObj = {};
            TestObj.test_append = append_to_results;
            spyOn(TestObj, 'test_append');
            TestObj.test_append('.results',
                '<tr class="match">',
                '<td>',
                '123456789ABC',
            vehicles['123456789ABC']);
            expect(TestObj.test_append).toHaveBeenCalledWith('.results',
                '<tr class="match">',
                '<td>',
                '123456789ABC',
                vehicles['123456789ABC']);
        });

        it("Compares the search term to the data set", function () {
            var TestObj = {};
            TestObj.test_compare = compare_search_term_to_data_set;
            spyOn(TestObj, 'test_compare');
            TestObj.test_compare('2009',
                                 '123456789ABC',
                                 vehicles['123456789ABC']);
            expect(TestObj.test_compare).toHaveBeenCalledWith('2009',
                                         '123456789ABC',
                                         vehicles['123456789ABC']);
        });
        
        it("Performs a search autocomplete", function() {
            var TestObj = {};
            TestObj.autocomplete = search_autocomplete;
            spyOn(TestObj, 'autocomplete');
            TestObj.autocomplete();
            expect(TestObj.autocomplete).toHaveBeenCalled();
        });
    });
});