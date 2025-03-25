<?php

function handlePutRequests()
{
    global $conn;
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['type']) && isset($data['id_game'])) {
        switch ($data['type']) {
            case 'team':
                if (!isset($data['id_team']) || !isset($data['id_game'])) {
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'Missing id_team or id_game']);
                    return;
                }
                $sql = "UPDATE team SET id_game = ? WHERE id_team = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "ii", $data['id_game'], $data['id_team']);
                break;

            case 'module':
                if (!isset($data['module_number']) || !isset($data['module_status'])) {
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'Missing module_number or module_status']);
                    return;
                }
                $sql = "UPDATE module SET module_status = ? WHERE module_number = ? AND id_game = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "sii", $data['module_status'], $data['module_number'], $data['id_game']);
                break;

            case 'mindgame':
                if (!isset($data['mindgame_number']) || !isset($data['mindgame_status'])) {
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'Missing mindgame_number or mindgame_status']);
                    return;
                }
                $sql = "UPDATE mindgame SET mindgame_status = ? WHERE mindgame_number = ? AND id_game = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "sii", $data['mindgame_status'], $data['mindgame_number'], $data['id_game']);
                break;

            default:
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Invalid type']);
                return;
        }

        if (mysqli_stmt_execute($stmt)) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['error' => mysqli_error($conn)]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Missing type or id_game']);
    }
}
