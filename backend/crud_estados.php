<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php';

// Obtener estados por país
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['pais_id'])) {
    $pais_id = $_GET['pais_id'];
    $sql = "SELECT estados.*, paises.nombre AS nombre_pais FROM estados 
            INNER JOIN paises ON estados.pais_id = paises.id 
            WHERE estados.pais_id='$pais_id'";
    $result = $conn->query($sql);

    $estados = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $estados[] = $row;
        }
    }

    echo json_encode($estados);
}

// Agregar un nuevo estado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $pais_id = $data['pais_id'];
    $nombre = $data['nombre'];

    $sql = "INSERT INTO estados (nombre, pais_id) VALUES ('$nombre', '$pais_id')";
    if ($conn->query($sql) === TRUE) {
        echo "Estado registrado exitosamente.";
    } else {
        echo "Error al registrar el estado: " . $conn->error;
    }
}

// Actualizar un estado

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $nombre = $data['nombre'];

    $sql = "UPDATE estados SET nombre='$nombre' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "Estado actualizado exitosamente.";
    } else {
        echo "Error al actualizar el estado: " . $conn->error;
    }
}

// Eliminar un estado
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM estados WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "Estado eliminado exitosamente.";
    } else {
        echo "Error al eliminar el estado: " . $conn->error;
    }
}

$conn->close();
?>
