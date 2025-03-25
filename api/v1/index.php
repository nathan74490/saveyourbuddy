<?php

include '../../corsPolicy.php';
include '../../connectiondb.php';
include './methods/handleGetRequests.php';
include './methods/handlePostRequests.php';
include './methods/handlePutRequests.php';

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        handleGetRequests();
        break;
    case 'POST':
        handlePostRequests();
        break;
    case 'PUT':
        handlePutRequests();
        break; 
    default:
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

?>
