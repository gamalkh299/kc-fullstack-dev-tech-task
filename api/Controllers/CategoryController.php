<?php

namespace Controllers;


use Models\Category;

require_once __DIR__ . '/../Models/Category.php';

class CategoryController
{

    private $category;
    private $db;
    public function __construct()
    {
        $this->category = new Category();
    }

    public function index()
    {
        $categories = $this->category->getAll();

        if (empty($categories)) {
            echo json_encode(['message' => 'No categories found']);
            return;
        }
        //add courses count to each category
        foreach ($categories as $key => $category) {
            $categories[$key]['count_of_courses'] = $this->category->getCoursesCount($category['id']);
        }
        echo json_encode($categories);
    }

    public function show($id)
    {
        $category = $this->category->getOne($id);
        if (empty($categories)) {
            echo json_encode(['message' => 'No categories found']);
            return;
        }
        $category['count_of_courses'] = $this->category->getCoursesCount($id);

       echo json_encode($category);
    }












}