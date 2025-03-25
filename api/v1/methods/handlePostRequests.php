<?php
function handlePostRequests()
{
    global $conn;
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['type'])) {
        switch ($data['type']) {
            case 'game':
                // Start transaction
                mysqli_begin_transaction($conn);

                try {
                    // Insert game
                    $sql = "INSERT INTO game (game_status) VALUES (?)";
                    $stmt = mysqli_prepare($conn, $sql);
                    mysqli_stmt_bind_param($stmt, "s", $data['game_status']);
                    mysqli_stmt_execute($stmt);
                    $game_id = mysqli_insert_id($conn);

                    // Insert 4 modules
                    for ($i = 1; $i <= 4; $i++) {
                        $module_status = "ongoing";
                        $sql = "INSERT INTO module (id_game, module_number, module_status) VALUES (?, ?, ?)";
                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "iis", $game_id, $i, $module_status);
                        mysqli_stmt_execute($stmt);
                    }

                    // Insert 2 mindgames
                    for ($i = 1; $i <= 2; $i++) {
                        $mindgame_status = "ongoing";
                        $sql = "INSERT INTO mindgame (id_game, mindgame_number, mindgame_status) VALUES (?, ?, ?)";
                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "iis", $game_id, $i, $mindgame_status);
                        mysqli_stmt_execute($stmt);
                    }

                    // Commit transaction
                    mysqli_commit($conn);

                    header('Content-Type: application/json');
                    echo json_encode([
                        'success' => true,
                        'game_id' => $game_id,
                        'message' => 'Game created with 4 modules and 2 mindgames'
                    ]);
                } catch (Exception $e) {
                    // Rollback transaction on error
                    mysqli_rollback($conn);
                    header('Content-Type: application/json');
                    echo json_encode(['error' => $e->getMessage()]);
                }
                break;
            case 'user':
                try {
                    $sql = "INSERT INTO user (nom, prenom, id_team) VALUES (?, ?, ?)";
                    $stmt = mysqli_prepare($conn, $sql);
                    mysqli_stmt_bind_param($stmt, "ssi", 
                        $data['nom'], 
                        $data['prenom'], 
                        $data['id_team']
                    );
                    mysqli_stmt_execute($stmt);
                    $user_id = mysqli_insert_id($conn);

                    header('Content-Type: application/json');
                    echo json_encode([
                        'success' => true,
                        'user_id' => $user_id,
                        'message' => 'User created successfully'
                    ]);
                } catch (Exception $e) {
                    header('Content-Type: application/json');
                    echo json_encode(['error' => $e->getMessage()]);
                }
                break;
                case 'team':
                    try {
                        $sql = "INSERT INTO team (team_name, numero, id_game) VALUES (?, ?, ?)";
                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "ssi", 
                            $data['team_name'], 
                            $data['numero'], 
                            $data['id_game']
                        );
                        mysqli_stmt_execute($stmt);
                        $team_id = mysqli_insert_id($conn);
    
                        header('Content-Type: application/json');
                        echo json_encode([
                            'success' => true,
                            'user_id' => $team_id,
                            'message' => 'Team created successfully'
                        ]);
                    } catch (Exception $e) {
                        header('Content-Type: application/json');
                        echo json_encode(['error' => $e->getMessage()]);
                    }
                    break;

            default:
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Invalid type']);
                return;
        }
    }
}
