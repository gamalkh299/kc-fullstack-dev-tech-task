<?php

namespace Controllers;


require_once __DIR__ . '/../Models/Course.php';

class CourseController
{
    private $course;

    public function __construct()
    {
        $this->course = new \Models\Course();
    }

    public function index()
    {
        $courses = $this->course->getAll();
        //add main category to each course
        if (!$courses) {
            echo json_encode([
                'message' => 'No courses found'
            ]);
            return;
        }
        foreach ($courses as $key => $course) {

            $courses[$key]['main_category'] = $this->course->getMainCategory($course['category_id']);
        }
        echo json_encode($courses);
    }

    public function show($id)
    {
        $course = $this->course->getOne($id);
        if (!$course) {
            echo json_encode([
                'message' => 'Course not found'
            ]);
            return;
        }
        $course['main_category'] = $this->course->getMainCategory($course['category_id']);
        echo json_encode($course);
    }

}