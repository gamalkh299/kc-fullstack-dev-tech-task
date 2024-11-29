<?php

namespace Models;

require_once __DIR__ . '/../config/connection.php';

class Category
{

    private $conn;
    private $table_name = "categories";  // The name of the table

    public $id;
    public $name;
    public $parent;



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

        $sql = "SELECT * FROM ".$this->table_name." WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':id' => $id]);

        $response = $stmt->fetch();


        return $response;
    }


    public function create($data)
    {
        $sql = "INSERT INTO ".$this->table_name." (id, name, parent) VALUES (:id, :name, :parent)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':id' => $data['id'],
            ':name' => $data['name'],
            ':parent' => $data['parent']
        ]);

        $stmt->fetch(\PDO::FETCH_ASSOC);

        return $stmt;
    }


    public function getCoursesCount($categoryId) {
        $query = "SELECT COUNT(*) as course_count FROM courses WHERE category_id = :category_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $categoryId);
        $stmt->execute();
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row['course_count'];
    }



}