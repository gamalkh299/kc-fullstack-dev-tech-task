<?php

namespace Models;

require_once __DIR__ . '/../config/connection.php';

class Course
{
    private $conn ;
    private $table_name = "courses";  // The name of the table

    public $id;
    public $course_id;
    public $title;
    public $description;
    public $image_preview;
    public $category_id;



    public function __construct()
    {
        $db = new \Database();
        $this->conn = $db->getConnection();
    }


    public function getAll()
    {
        $sql = "SELECT * FROM ".$this->table_name;

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

    public function getOne($id)
    {
        $sql = "SELECT * FROM ".$this->table_name." WHERE course_id = :course_id OR id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':course_id' => $id,
            ':id' => $id
        ]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }


    public function getCoursesByCategory()
    {
        $sql = "SELECT * FROM ".$this->table_name." WHERE category_id = :category_id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':category_id' => $this->category_id
        ]);

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }


    public function getMainCategory($id)
    {
        $sql = "SELECT * FROM categories WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':id' => $id
        ]);

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }




}