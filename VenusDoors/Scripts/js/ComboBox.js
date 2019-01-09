$(function () {
    'use strict'

    $('.form-layout .form-control').on('focusin', function () {
        $(this).closest('.form-group').addClass('form-group-active');
    });

    $('.form-layout .form-control').on('focusout', function () {
        $(this).closest('.form-group').removeClass('form-group-active');
    });

    // Select2
    $('#select2-a, #select2-b').select2({
        minimumResultsForSearch: Infinity
    });

    $('#select2-a').on('select2:opening', function (e) {
        $(this).closest('.form-group').addClass('form-group-active');
    });

    $('#select2-a').on('select2:closing', function (e) {
        $(this).closest('.form-group').removeClass('form-group-active');
    });

});