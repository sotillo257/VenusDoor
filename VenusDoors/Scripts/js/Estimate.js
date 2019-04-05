$(function () {
    $("#add").click(function () {
        var n = $('tr:last', $("#mitabla")).length;
        var tds = '<tr>';
        for (var i = 0; i < n; i++) {
            tds += '<td> </td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td></td>';
        }
        tds += '</tr>';
        $("#mitabla").append(tds);
    });

    $('#modalToggle').click(function () {
        $('#modal').modal({
            backdrop: 'static'
        });
    });

})
$(function () {
    'use strict';
    $('.br-mailbox-list').perfectScrollbar();

    $('#showMailBoxLeft').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('show-mb-left')) {
            $('body').removeClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-left').addClass('fa-arrow-right');
        } else {
            $('body').addClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-right').addClass('fa-arrow-left');
        }
    });
});

$(document).ready(function () {

    var container = $('#Demo');
    var conta = $('#conta');
    
    container.pagination({
        className: 'paginationjs-theme-blue paginationjs-small',
        dataSource: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
        callback: function (data, pagination) {
            // template method of yourself
            console.log(data);
            var option = '';
            for (var i = 0; i < data.length; i++) {
                option +='<div class="br-mailbox-list-item active">';
                option +=' <div class="d-flex justify-content-between mg-b-5"><div>';
                option +='            <i class="icon ion-ios-star tx-warning"></i>';
                option +='            <i class="icon ion-android-attach"></i>';
                option +='        </div>';
                option +='        <span class="tx-12">'+ data[i] +' hours ago</span>';
                option +='    </div><!-- d-flex -->';
                option +='    <h6 class="tx-14 mg-b-10 tx-gray-800">Socrates Itumay, me ('+i+')</h6>';
                option +='   <p class="tx-12 tx-gray-600 mg-b-5">I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never...</p>';
                option += ' </div><!-- br-mailbox-list-item -->';
            }
            conta.html(option);
        }
    });
    });

