// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        return "<div class='row content-tasks border rounded task' data-id='" + task.id + "'> \
          " + "<input class='mark-complete' type='checkbox' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "><p class='task-input'>" + task.content + '</p>' + "<button class='delete' data-id='" + task.id +"'><svg class='bi bi-trash-fill' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z' clip-rule='evenodd'/></svg></button> \
          </div>";
      });

      $("#tasks").html(htmlString);
    });

    $.ajax({
      type: 'GET',
      url: 'api/tasks?api_key=1',
      dataType: 'json',
      success: function(response, textStatus) {
        $('#tasks').empty();
        response.tasks.forEach(function(task) {
          $('#tasks').append(
            "<div class='row content-tasks border rounded task' data-id='" + task.id + "'> \
                   " + "<input class='mark-complete' type='checkbox' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "><p class='task-input'>" + task.content + '</p>' + "<button class='delete' data-id='" + task.id +"'><svg class='bi bi-trash-fill' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z' clip-rule='evenodd'/></svg></button> \
                   </div>");
        });
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'api/tasks?api_key=1',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function(response, textStatus) {
        $('#new-task-content').val('');
        indexTasks();
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $('#create-task').on('submit', function(e) {
   e.preventDefault();
   createTask();
 });



  var deleteTask = function(id) {
      $.ajax({
        type: 'DELETE',
        url: 'api/tasks/' + id + '?api_key=1',
        success: function(response, textStatus) {
          indexTasks();
        },
        error: function(request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    };

    $(document).on('click', '.delete', function() {
     deleteTask($(this).data('id'));
   });


   var markTaskComplete = function(id) {
    $.ajax({
      type: 'PUT',
      url: 'api/tasks/' + id + '/mark_complete?api_key=1',
      dataType: 'json',
      success: function(response, textStatus) {
        indexTasks();
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var markTaskActive = function(id) {
    $.ajax({
      type: 'PUT',
      url: 'api/tasks/' + id + '/mark_active?api_key=1',
      dataType: 'json',
      success: function(response, textStatus) {
        indexTasks();
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $(document).on('change', '.mark-complete', function() {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

  indexTasks();

});
