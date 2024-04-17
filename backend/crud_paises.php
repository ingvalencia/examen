<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php';

// Obtener todos los países
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM paises";
    $result = $conn->query($sql);

    $paises = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $paises[] = $row;
        }
    }

    echo json_encode($paises);
}

// Agregar un nuevo país
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $nombre = $data['nombre'];

    $sql = "INSERT INTO paises (nombre) VALUES ('$nombre')";
    if ($conn->query($sql) === TRUE) {
        echo "País registrado exitosamente.";
    } else {
        echo "Error al registrar el país: " . $conn->error;
    }
}

// Actualizar un país
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $nombre = $data['nombre'];

    $sql = "UPDATE paises SET nombre='$nombre' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "País actualizado exitosamente.";
    } else {
        echo "Error al actualizar el país: " . $conn->error;
    }
}

// Eliminar un país
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];

    $sql = "DELETE FROM paises WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "País eliminado exitosamente.";
    } else {
        echo "Error al eliminar el país: " . $conn->error;
    }
}

$conn->close();
?>
