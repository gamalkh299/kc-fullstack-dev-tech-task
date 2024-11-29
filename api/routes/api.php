<?php


require_once __DIR__ . '/../Controllers/CategoryController.php';
require_once __DIR__ . './../Controllers/CourseController.php';


$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

$uri = explode('/', $requestUri);


if ($requestUri == "/") {
    switch ($requestMethod) {
        case "GET":
            echo "You are in the root!";
            break;
        default:
            sendResponse405();
            break;
    }
} elseif ($uri[1] == "categories") {
    $categoryController = new \Controllers\CategoryController();
    switch ($requestMethod) {
        case "GET":
            if (isset($uri[2])) {
                $categoryController->show($uri[2]);
            } else {
                $categoryController->index();
            }
            break;
        default:
            sendResponse405();
            break;
    }

}elseif ($uri[1] == "courses") {
    $courseController = new \Controllers\CourseController();
    switch ($requestMethod) {
        case "GET":
            if (isset($uri[2])) {
                $courseController->show($uri[2]);
            } else {
                $courseController->index();
            }
            break;
        default:
            sendResponse405();
            break;
    }
}else {
    sendResponse404();
}


function sendResponse405()
{
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}

function sendResponse404()
{
    http_response_code(404);
    echo json_encode(["message" => "404 Not Found"]);
}