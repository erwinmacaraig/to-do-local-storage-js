var ENTER_KEY = 13
window.onload = function() {
    var todos = [];

    init();

    function init() {
        todos = JSON.parse(localStorage.getItem('todos')) || []; // OR it with empty array for undefined
        bindEvents();
        renderItems();
        
    }

    function bindEvents() {
        $('#to-do-input').keypress(function(event) {
            // console.log(event.keyCode + ' ' + event.key);

            var task = $(this).val();
            if(event.keyCode === ENTER_KEY) {
                console.log('ENTER key is pressed');
                createTodo(task);
                syncLocalStorage();
                renderItems();
                $(this).val('');
            }
        });

        /* $('#todo-tasks-list li input').click(function(event) {
            console.log(event);
        }); */

        $('#todo-tasks-list').on('click', 'li input', function(event){
            console.log(event);
            var itemId = $(this).data('id');

            // checking the attribute value of the checkbox
            if($(this).is(':checked')) {
                // update the "done" parameter as true
                updateItem(itemId, true);
            } else {
                // update the "done" parameter as false
                updateItem(itemId, false);

            }
            syncLocalStorage();
            renderItems();
        });

        $('#todo-tasks-list').on('click', 'li button', function(event){
            var itemId = $(this).data('id');
            removeItem(itemId);
            syncLocalStorage();
            renderItems();
        });
    }

    function createTodo(task) {
        console.log(task);
        todos.push({id: todos.length, task: task, done: false});
    }

    function syncLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderItems() {
        $('#todo-tasks-list').html('');
        for (var i = 0; i < todos.length; i++) {
            var item = createItemTemplate(todos[i]);
            $('#todo-tasks-list').append(item);
        }
    }

    function createItemTemplate(todo) {
        var item = '<li class="todo-item '+ (todo.done ? 'done' : '') +'">';
            item += '<label class="control--checkbox">';
            item +=  todo.task;
            item += '<input data-id="'+ todo.id +'" type="checkbox" '+ (todo.done ? 'checked' : '') +' />';
            item += '<div class="checked-icon"></div>';
            item += '</label>';
            item += '<button data-id="'+ todo.id +'" class="remove-todo-btn"><i class="fa fa-trash"></i></button>';
            item += '</li>';

        return item;
    }

    function updateItem(id, isDone) {
        for (var i = 0; i < todos.length; i++) {
            if(todos[i].id === id) {
                todos[i].done = isDone;
                break;
            }
        }
    }

    function removeItem(id) {
        for (var i = 0; i < todos.length; i++) {
            if(todos[i].id === id) { 
                todos.splice(i, 1); 
            }
        }
    }



};