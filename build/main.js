import "./ts/Clarity.min.ts";
import Vue from 'vue/dist/vue.js';

window.clarity.hotkeys.bind('a b c', function(){ console.log('pressed'); });

new Vue({
    el: '#FormValidationExample',
    data: {
        name: '',
        password: ''
    },
    methods: {
        revalidate: function() {
            return this.$refs.validation.revalidate();
        }
    }
});
new Vue({
    el: '#FormGenerationExample',
    data: {
        action: "/post/action",
        ajaxAction: "/action/goes/nowhere",
        result: "",
        model: {
            id: 1,
            name: "Jane Doe",
            password: "ABC123",
            skills: [0,1],
            email: "jane.doe@gmail.com",
            status: true,
            date: "",
            options: "CSS3",
            description: "This is a description about Jane Doe.",
            files: [],
            someText: "<div class='body'>This is some random text for reasons</div>",
            complexObject: {
                title: "My Title"
            },
            complexConditional: {
                display: true
            },
            complexObjectList: [{
                order: 1,
                name: "Jane"
            },{
                order: 2,
                name: "John"
            }],
            complexObjectTabs: {
                order: 1,
                name: "Jane",
                number: 2,
                lastName: "John"
            }
        },
        schema: {
            fields: [{
                type: "input",
                inputType: "text",
                label: "ID (disabled text field)",
                model: "id",
                readonly: true,         
                disabled: true
            },{
                type: "input",
                inputType: "date",
                labelClasses: "fa-calendar",
                model: "date",
                inputClasses: "extra-large"
            },{
                type: "input",
                inputType: "text",
                model: "name",
                labelClasses: "fa-user",
                placeholder: "Your name",
                required: true,
                errorMessageValueMissing: "Name is required",
                datalist: ["value1","value2","Something"]
            },{
                type: "input",
                inputType: "password",
                model: "password",
                labelClasses: "fa-key",
                minlength: 6,
                required: true,
                hint: "Minimum 6 characters",
                errorMessageValueMissing: "Password is required",
                errorMessageTooShort: "Password must be at least 6 characters"
            },{
                type: "select",
                model: "skills",      
                values: [ { key: 0, value: "Javascript"},
                            { key: 1, value: "VueJS"},
                            { key: 2, value: "CSS3"},
                            { key: 3, value: "HTML5"},
                            { key: 4, value: "Something"},
                            { key: 5, value: "Another Thing"}],
                multiple: true
            },{
                type: "input",
                inputType: "email",
                label: "E-mail",
                labelClasses: "fa-envelope",
                model: "email",
                placeholder: "User's e-mail address"
            },{
                type: "checkbox",
                model: "status",
                default: true
            },{
                type: "radio",
                model: "options",
                values: ["Javascript", "VueJS", "CSS3"]
            },{
                type: "textarea",
                model: "description",
                labelClasses: "fa-bullhorn",
                maxlength: 200
            },{
                type: "text",
                model: "someText",
                classes: "warning panel"
            },{
                type: "upload",
                model: "files",
                multiple: true,
                placeholder: "Please Drop Files Here To Upload",
                previewClasses: "primary"
            },{
                type: "complex",
                schema: {
                    fields: [{
                        type: "input",
                        inputType: "text",
                        model: "title"
                    },{
                        type: "text",
                        model: "😀"
                    }]
                },
                model: "complexObject"
            },{
                type: "complex-conditional",
                schema: {
                    fields: [{
                        type: "text",
                        model: "This should only display if the Title above is set to 'My Title'"
                    }]
                },
                model: "complexConditional"
            },{
                type: "complex-list",
                schema: {
                    tableClasses: "primary",
                    confirmRemoval: true,
                    fields: [{
                        type: "input",
                        inputType: "number",
                        model: "order",
                        label: "order in list"
                    },{
                        type: "input",
                        inputType: "text",
                        model: "name",
                        hint: "Write a name here"
                    }]
                },
                model: "complexObjectList"
            },{
                type: "complex-tabs",
                schema: {
                    tabClasses: "panel",
                    tabs: [
                        { icon: 'fa-user', name: 'Tab1', selected: false, fields:[{ type: "input", inputType: "number", model: "order"},{ type: "input", inputType: "text", model: "name" }] },
                        { icon: 'fa-plus', name: 'Tab2', selected: false, fields:[{ type: "input", inputType: "number", model: "number"},{ type: "input", inputType: "text", model: "lastName",label: "Last Name" }] }
                    ]
                },
                model: "complexObjectTabs"
            },{
                type: "buttons",
                buttons: [
                    { id: 0, type: "submit", value: "This is a Submit Button" },
                    { id: 1, type: "reset", value: "This is a Reset Button" },
                    { id: 2, type: "button", value: "This is a Normal Button" }
                ]
            }]
        }
    },
    methods: {
        changed: function(newModel) {
            this.model = newModel;
            this.model.complexConditional.display = this.model.complexObject.title === "My Title";
        },
        click: function(event, field) {
            if (field.id === 2) {
                console.log("Yay I pressed a button");
            }
        },
        success: function(result) {
            this.result = result;
        },
        error: function(result) {
            this.result = result;
        },
        exception: function(result) {
            this.result = result.message;
        }
    }
});
new Vue({
    el: '#VerticalTabExample',
    data: {
        sections: [
            { icon: 'fa-file', name: 'Tab1', selected: false, results: [ { title: 'News Item 1', url: 'http://www.google.com', info: 'My info' } ] },
            { icon: 'fa-file', name: 'Tab2', selected: false, results: [ { title: 'News Item 2', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 3', url: 'http://www.google.com', info: 'My info' } ] },
            { icon: 'fa-file', name: 'Tab3', selected: false, results: [ { title: 'News Item 4', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 5', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 6', url: 'http://www.google.com', info: 'My info' } ] }
        ],
        sectionPicked: { icon: 'fa-file', name: 'Tab1', selected: false, results: [ { title: 'Initial data', url: 'http://www.google.com', info: 'My initial data' } ] }
    },
    methods: {
        sectionChanged: function(newSection) {
            this.sectionPicked = newSection;
        },
        modifySections: function() {
            this.sections=[
                { icon: 'fa-file', name: 'New Tab1', selected: false, results: [ { title: 'New News Item 1', url: 'http://www.google.com', info: 'My info' } ] },
                { icon: 'fa-file', name: 'New Tab2', selected: false, results: [ { title: 'New News Item 2', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 3', url: 'http://www.google.com', info: 'My info' } ] },
                { icon: 'fa-file', name: 'New Tab3', selected: false, results: [ { title: 'New News Item 4', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 5', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 6', url: 'http://www.google.com', info: 'My info' } ] }
            ];
        }
    }
});
new Vue({
    el: '#TabExample',
    data: {
        sections: [
            { icon: 'fa-file', name: 'Tab1', selected: false, results: [ { title: 'News Item 1', url: 'http://www.google.com', info: 'My info' } ] },
            { icon: 'fa-file', name: 'Tab2', selected: false, results: [ { title: 'News Item 2', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 3', url: 'http://www.google.com', info: 'My info' } ] },
            { icon: 'fa-file', name: 'Tab3', selected: false, results: [ { title: 'News Item 4', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 5', url: 'http://www.google.com', info: 'My info' }, { title: 'News Item 6', url: 'http://www.google.com', info: 'My info' } ] }
        ],
        sectionPicked: { icon: 'fa-file', name: 'Tab1', selected: false, results: [ { title: 'Initial data', url: 'http://www.google.com', info: 'My initial data' } ] }
    },
    methods: {
        sectionChanged: function(newSection) {
            this.sectionPicked = newSection;
        },
        modifySections: function() {
            this.sections=[
                { icon: 'fa-file', name: 'New Tab1', selected: false, results: [ { title: 'New News Item 1', url: 'http://www.google.com', info: 'My info' } ] },
                { icon: 'fa-file', name: 'New Tab2', selected: false, results: [ { title: 'New News Item 2', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 3', url: 'http://www.google.com', info: 'My info' } ] },
                { icon: 'fa-file', name: 'New Tab3', selected: false, results: [ { title: 'New News Item 4', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 5', url: 'http://www.google.com', info: 'My info' }, { title: 'New News Item 6', url: 'http://www.google.com', info: 'My info' } ] }
            ];
        }
    }
});
new Vue({
    el: '#ModalExample',
    data: {
        showModal: false
    },
    methods: {
        showModalFunc: function() {
            this.showModal = true;
        },
        closeModal: function() {
            this.showModal = false;
        },
        showConsoleMessage: function() {
            console.log('clicked outside of the button');
        }
    }
});
new Vue({
    el: '#GridExample',
    data: {
        searchQuery: '',
        gridColumns: ['strings', 'numbers', 'dates', 'long_name', 'html'],
        gridData: [
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<a href="http://www.google.com">1</a>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<a href="http://www.google.com">2</a>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<a href="http://www.google.com">3</a>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<a href="http://www.google.com">4</a>' },
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<a href="http://www.google.com">5</a>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<a href="http://www.google.com">6</a>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<a href="http://www.bing.com">1</a>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<a href="http://www.bing.com">2</a>' },
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<a href="http://www.bing.com">3</a>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<a href="http://www.bing.com">4</a>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<a href="http://www.bing.com">5</a>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<a href="http://www.bing.com">6</a>' },
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<a href="http://www.yahoo.com">1</a>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<a href="http://www.yahoo.com">2</a>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<a href="http://www.yahoo.com">3</a>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<a href="http://www.yahoo.com">4</a>' },
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<a href="http://www.yahoo.com">5</a>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<a href="http://www.yahoo.com">6</a>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<p>1</p>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<p>2</p>' },
            { strings: 'Chuck Norris', numbers: Infinity, dates: '1/1/2012',long_name: '1',html: '<p>3</p>' },
            { strings: 'Bruce Lee', numbers: 9000, dates: '6/21/2014',long_name: '2',html: '<p>4</p>' },
            { strings: 'Jackie Chan', numbers: 7000, dates: '8/21/1999',long_name: '3',html: '<p>5</p>' },
            { strings: 'Jet Li', numbers: 8000, dates: '1/1/2011',long_name: '4',html: '<p>6</p>' }
        ]
    }
});